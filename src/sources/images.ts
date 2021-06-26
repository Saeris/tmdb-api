import { DataSource } from "apollo-datasource"
import type {
  HeadObjectRequest,
  PutObjectCommandOutput
} from "@aws-sdk/client-s3"
import {
  GetObjectCommand,
  HeadObjectCommand,
  S3Client,
  PutObjectCommand
} from "@aws-sdk/client-s3"
import { optimize } from "svgo"
import Vibrant from "node-vibrant"
// @ts-expect-error
import { Potrace } from "potrace"
import DataURIParser from "datauri/parser" // https://www.npmjs.com/package/datauri
import type { Context } from "../server"
import { memoize, round } from "../utils"

export type Color =
  | "vibrant"
  | "lightVibrant"
  | "darkVibrant"
  | "muted"
  | "lightMuted"
  | "darkMuted"

interface SVGOptions {
  color?: Color
  base64?: boolean
}

export type SVGResult = Promise<string | null>

export type ImageResult = string | null | SVGResult

// eslint-disable-next-line no-use-before-define
export type ColorsResult = ReturnType<Images["extractColor"]> | null

type GetSVG = (
  options: {
    id: string
    size?: string
  } & SVGOptions
) => SVGResult

type Custom = (
  options: {
    id: string
    size: string
    svg?: boolean
  } & SVGOptions
) => ImageResult

type GetCustom = (
  options: {
    id: string
    svg?: boolean
  } & SVGOptions
) => ImageResult

const { debug, error } = console

const isLocalEnv =
  process.env.IS_OFFLINE ??
  process.env.IS_LOCAL ??
  !process.env.LAMBDA_TASK_ROOT

interface ColorPalette {
  vibrant: number[] | null
  lightVibrant: number[] | null
  darkVibrant: number[] | null
  muted: number[] | null
  lightMuted: number[] | null
  darkMuted: number[] | null
}

export class Images extends DataSource<Context> {
  baseURL: string = `https://image.tmdb.org/t/p/`
  cachedColor: Images["extractColor"] | undefined
  s3Base?: string
  S3?: S3Client
  bucket: string = ``

  initialize(): void {
    this.cachedColor = memoize(
      this.extractColor
    ) as unknown as Images["extractColor"]

    // Don't create a new connection to S3 if we don't have a valid URL to connect to
    if ((process.env.S3_HOST && process.env.S3_PORT) || process.env.S3_URL) {
      this.s3Base = isLocalEnv
        ? `http://${process.env.S3_HOST ?? ``}:${process.env.S3_PORT ?? ``}`
        : process.env.S3_URL
      this.S3 = new S3Client({
        forcePathStyle: true,
        endpoint: this.s3Base
      })
    }

    this.bucket = process.env.S3_BUCKET ?? ``
  }

  url = (size: string, id: string): string | null =>
    size && id ? `${this.baseURL}${size}${id}` : null

  svg: GetSVG = async ({ id, size, color, base64 }) =>
    this.getSVG({ id, size, color, base64 })

  custom: Custom = ({ id, size, svg = false, color, base64 }) =>
    svg ? this.svg({ id, size, color, base64 }) : this.url(size, id)

  original: GetCustom = ({ id, svg, color, base64 }) =>
    this.custom({ id, size: `original`, svg, color, base64 })

  w45: GetCustom = ({ id, svg, color, base64 }) =>
    this.custom({ id, size: `w45`, svg, color, base64 })

  w92: GetCustom = ({ id, svg, color, base64 }) =>
    this.custom({ id, size: `w92`, svg, color, base64 })

  w154: GetCustom = ({ id, svg, color, base64 }) =>
    this.custom({ id, size: `w154`, svg, color, base64 })

  w185: GetCustom = ({ id, svg, color, base64 }) =>
    this.custom({ id, size: `w185`, svg, color, base64 })

  w300: GetCustom = ({ id, svg, color, base64 }) =>
    this.custom({ id, size: `w300`, svg, color, base64 })

  w342: GetCustom = ({ id, svg, color, base64 }) =>
    this.custom({ id, size: `w342`, svg, color, base64 })

  w500: GetCustom = ({ id, svg, color, base64 }) =>
    this.custom({ id, size: `w500`, svg, color, base64 })

  w780: GetCustom = ({ id, svg, color, base64 }) =>
    this.custom({ id, size: `w780`, svg, color, base64 })

  w1280: GetCustom = ({ id, svg, color, base64 }) =>
    this.custom({ id, size: `w1280`, svg, color, base64 })

  h632: GetCustom = ({ id, svg, color, base64 }) =>
    this.custom({ id, size: `h632`, svg, color, base64 })

  colors = (id: string): ColorsResult => {
    const url = this.url(`original`, id)
    return url ? this.cachedColor?.(url) ?? null : null
  }

  extractColor = async (
    url: Parameters<typeof Vibrant.from>[0]
  ): Promise<ColorPalette> => {
    const builder = Vibrant.from(url)
    const palette = await builder.getPalette()
    return {
      vibrant: palette.Vibrant?.rgb.map(round) ?? null,
      lightVibrant: palette.LightVibrant?.rgb.map(round) ?? null,
      darkVibrant: palette.DarkVibrant?.rgb.map(round) ?? null,
      muted: palette.Muted?.rgb.map(round) ?? null,
      lightMuted: palette.LightMuted?.rgb.map(round) ?? null,
      darkMuted: palette.DarkMuted?.rgb.map(round) ?? null
    }
  }

  params = (Key: string): HeadObjectRequest => ({
    Bucket: this.bucket,
    Key
  })

  /**
   * Returns the file path for a cached SVG.
   */
  svgPath = (
    filename: string,
    size: string = `original`,
    color: Color = `vibrant`
  ): string => `${size}/${color}${filename.replace(/\.[^/.]+$/, `.svg`)}`

  getSVG: GetSVG = async ({
    id: filename,
    size = ``,
    color = `vibrant`,
    base64
  }) => {
    const path = this.svgPath(filename, size, color)
    const params = this.params(path)
    try {
      await this.S3?.send(new HeadObjectCommand(params))
      const uri = await this.getS3File(params)
      return base64 && uri
        ? this.encodeSvgDataUri(uri)
        : `${this.s3Base ?? ``}/${this.bucket}/${path}`
    } catch (err: unknown) {
      debug(`Existing file not found, creating...`)
    }
    try {
      const image = await this.traceImg(`${size}${filename}`, color)
      await this.saveImage(path, image)
      return base64
        ? this.encodeSvgDataUri(image)
        : `${this.s3Base ?? ``}/${this.bucket}/${path}`
    } catch (err: unknown) {
      error(`An error occured while attempting to upload an image to S3`, err)
      return null
    }
  }

  getS3File = async (
    params: ReturnType<Images["params"]>
  ): Promise<string | undefined> => {
    try {
      const res = await this.S3?.send(new GetObjectCommand(params))
      return res?.Body?.toString()
    } catch (err: unknown) {
      error(`Unable to retrieve file!`, err)
    }
  }

  saveImage = async (
    path: string,
    image: string
  ): Promise<PutObjectCommandOutput | undefined> => {
    const result = await this.S3?.send(
      new PutObjectCommand({
        ...this.params(path),
        Body: image,
        ACL: `public-read`
      })
    )
    return result
  }

  traceImg = async (path: string, color: Color): Promise<string> =>
    this.optimizeSvg(await this.traceSvg(`${this.baseURL}${path}`, color))

  traceSvg = async (
    url: Parameters<typeof Vibrant.from>[0],
    color: Color
  ): Promise<string> => {
    const colors = await this.extractColor(url)
    return new Promise((resolve, reject) => {
      const trace: typeof Potrace = new Potrace({
        turdSize: 150,
        color: `rgb(${String(colors[color] ?? [0, 0, 0])})`
      })
      //eslint-disable-next-line
      trace.loadImage(url, (err?: Error) =>
        err ? reject(err) : resolve(trace.getSVG() as string)
      )
    })
  }

  optimizeSvg = (svg: string): string => {
    const { data } = optimize(svg, { floatPrecision: 0 })
    return data
  }

  encodeSvgDataUri = (svg: string): string => {
    const datauri = new DataURIParser()
    datauri.format(`.svg`, svg)
    return datauri.content!
  }
}
