import { DataSource } from 'apollo-datasource'
import AWS from "aws-sdk"
import * as Vibrant from "node-vibrant"
import { Potrace } from "potrace"
import SVGO from "svgo"
import DataURI from 'datauri' // https://www.npmjs.com/package/datauri
import { debug, error } from "winston"
import { memoize } from "../utils"

const isLocalEnv = process.env.IS_OFFLINE || process.env.IS_LOCAL || !process.env.LAMBDA_TASK_ROOT

export class Images extends DataSource {
  baseURL = `https://image.tmdb.org/t/p/`
  s3Base = isLocalEnv ? `http://${process.env.S3_HOST}:${process.env.S3_PORT}` : process.env.S3_URL

  initialize({ cache }) {
    this.cachedColor = memoize(this.extractColor, cache)
    this.S3 = new AWS.S3({
      s3ForcePathStyle: true,
      endpoint: this.s3Base
    })
    this.bucket = process.env.S3_BUCKET
  }

  url = (size, id) => `${this.baseURL}${size}${id}`

  svg = (id, size, color, base64) => this.getSVG(id, size, color, base64)

  custom = (id, size, svg, color, base64) => (svg ? this.svg(id, size, color, base64) : this.url(size, id))

  original = (id, svg, color, base64) => this.custom(id, `original`, svg, color, base64)

  w45 = (id, svg, color, base64) => this.custom(id, `w45`, svg, color, base64)
  w92 = (id, svg, color, base64) => this.custom(id, `w92`, svg, color, base64)
  w154 = (id, svg, color, base64) => this.custom(id, `w154`, svg, color, base64)
  w185 = (id, svg, color, base64) => this.custom(id, `w185`, svg, color, base64)
  w300 = (id, svg, color, base64) => this.custom(id, `w300`, svg, color, base64)
  w342 = (id, svg, color, base64) => this.custom(id, `w342`, svg, color, base64)
  w500 = (id, svg, color, base64) => this.custom(id, `w500`, svg, color, base64)
  w780 = (id, svg, color, base64) => this.custom(id, `w780`, svg, color, base64)
  w1280 = (id, svg, color, base64) => this.custom(id, `w1280`, svg, color, base64)

  h632 = (id, svg, color) => this.custom(id, `h632`, svg, color)

  colors = id => this.extractColor(this.url(`original`, id))

  extractColor = async url => {
    const extracted = await Vibrant.from(url)
    const palette = await extracted.getPalette()
    return {
      vibrant: palette?.Vibrant?.getRgb() || null,
      lightVibrant: palette?.LightVibrant?.getRgb() || null,
      darkVibrant: palette?.DarkVibrant?.getRgb() || null,
      muted: palette?.Muted?.getRgb() || null,
      lightMuted: palette?.LightMuted?.getRgb() || null,
      darkMuted: palette?.DarkMuted?.getRgb() || null
    }
  }

  params = Key => ({ Bucket: this.bucket, Key })

  svgPath = (filename, size, color) => `${size}/${color}${filename.replace(/\.[^/.]+$/, `.svg`)}`

  getSVG = async (filename, size, color, base64) => {
    const path = this.svgPath(filename, size, color)
    const params = this.params(path)
    try {
      await this.S3.headObject(params).promise()
      return base64 ? this.encodeSvgDataUri(await this.getS3File(params)) : `${this.s3Base}/${this.bucket}/${path}`
    } catch (err) {
      debug(`Existing file not found, creating...`)
    }
    try {
      const image = await this.traceImg(`${size}${filename}`, color)
      await this.saveImage(path, image)
      return base64 ? this.encodeSvgDataUri(image) : `${this.s3Base}/${this.bucket}/${path}`
    } catch (err) {
      error(`An error occured while attempting to upload an image to S3`, err)
      return null
    }
  }

  getS3File = async params => {
    const res = await this.S3.getObject(params, err => {
      if (err) error(`Unable to retrieve file!`, err)
    }).promise()
    return res.Body.toString()
  }

  saveImage = (path, image) => this.S3.upload({
    ...this.params(path),
    Body: image,
    ACL: `public-read`
  }).promise()

  traceImg = async (path, color) => {
    const svg = await this.traceSvg(`${this.baseURL}${path}`, color)
    return this.optimizeSvg(svg)
  }

  traceSvg = (url, color) => new Promise(async (resolve, reject) => {
    const colors = await this.extractColor(url)
    const trace = new Potrace({
      turdSize: 150,
      color: `rgb(${colors[color] || [0, 0, 0]})`
    })
    trace.loadImage(url, err => (err ? reject(err) : resolve(trace.getSVG()))) //eslint-disable-line
  })

  optimizeSvg = async svg => {
    const svgo = new SVGO({ floatPrecision: 0 })
    const { data } = await svgo.optimize(svg)
    return data
  }

  encodeSvgDataUri = svg => {
    const datauri = new DataURI()
    datauri.format(`.svg`, svg)
    return datauri.content
  }
}
