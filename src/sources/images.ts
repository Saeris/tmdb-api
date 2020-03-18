import { DataSource } from "apollo-datasource";
import AWS from "aws-sdk";
import SVGO from "svgo";
import Vibrant from "node-vibrant";
// @ts-ignore
import { Potrace } from "potrace";
// @ts-ignore
import DataURI from "datauri"; // https://www.npmjs.com/package/datauri
import { Context } from "../";
import { memoize } from "../utils";

export type Color =
  | "vibrant"
  | "lightVibrant"
  | "darkVibrant"
  | "muted"
  | "lightMuted"
  | "darkMuted";

interface SVGOptions {
  color?: Color;
  base64?: boolean;
}

export type SVGResult = Promise<string | null>;

export type ImageResult = string | null | SVGResult;

export type ColorsResult = ReturnType<Images["extractColor"]> | null

type GetSVG = (
  options: {
    id: string;
    size?: string;
  } & SVGOptions
) => SVGResult;

type Custom = (
  options: {
    id: string;
    size: string;
    svg?: boolean;
  } & SVGOptions
) => ImageResult;

type GetCustom = (
  options: {
    id: string;
    svg?: boolean;
  } & SVGOptions
) => ImageResult;

const { debug, error } = console;

const isLocalEnv =
  process.env.IS_OFFLINE ||
  process.env.IS_LOCAL ||
  !process.env.LAMBDA_TASK_ROOT;

export class Images extends DataSource<Context> {
  baseURL: string = `https://image.tmdb.org/t/p/`;
  cachedColor: any = null;
  s3Base?: string;
  S3?: AWS.S3;
  bucket: string = ``;

  initialize() {
    this.cachedColor = memoize(this.extractColor);
    this.s3Base = isLocalEnv
      ? `http://${process.env.S3_HOST}:${process.env.S3_PORT}`
      : process.env.S3_URL;
    this.S3 = new AWS.S3({
      s3ForcePathStyle: true,
      endpoint: this.s3Base
    });
    this.bucket = process.env.S3_BUCKET || ``;
  }

  url = (size: string, id: string): string | null =>
    size && id ? `${this.baseURL}${size}${id}` : null;

  svg: GetSVG = ({ id, size, color, base64 }) =>
    this.getSVG({ id, size, color, base64 });

  custom: Custom = ({ id, size, svg = false, color, base64 }) =>
    svg ? this.svg({ id, size, color, base64 }) : this.url(size, id);

  original: GetCustom = ({ id, svg, color, base64 }) =>
    this.custom({ id, size: `original`, svg, color, base64 });

  w45: GetCustom = ({ id, svg, color, base64 }) =>
    this.custom({ id, size: `w45`, svg, color, base64 });

  w92: GetCustom = ({ id, svg, color, base64 }) =>
    this.custom({ id, size: `w92`, svg, color, base64 });

  w154: GetCustom = ({ id, svg, color, base64 }) =>
    this.custom({ id, size: `w154`, svg, color, base64 });

  w185: GetCustom = ({ id, svg, color, base64 }) =>
    this.custom({ id, size: `w185`, svg, color, base64 });

  w300: GetCustom = ({ id, svg, color, base64 }) =>
    this.custom({ id, size: `w300`, svg, color, base64 });

  w342: GetCustom = ({ id, svg, color, base64 }) =>
    this.custom({ id, size: `w342`, svg, color, base64 });

  w500: GetCustom = ({ id, svg, color, base64 }) =>
    this.custom({ id, size: `w500`, svg, color, base64 });

  w780: GetCustom = ({ id, svg, color, base64 }) =>
    this.custom({ id, size: `w780`, svg, color, base64 });

  w1280: GetCustom = ({ id, svg, color, base64 }) =>
    this.custom({ id, size: `w1280`, svg, color, base64 });

  h632: GetCustom = ({ id, svg, color, base64 }) =>
    this.custom({ id, size: `h632`, svg, color, base64 });

  colors = (id: string): ColorsResult => {
    const url = this.url(`original`, id);
    return url ? this?.cachedColor?.(url) || null : null;
  };

  extractColor = async (url: Parameters<typeof Vibrant.from>[0]) => {
    const builder = Vibrant.from(url);
    const palette = await builder.getPalette();
    return (
      {
        vibrant: palette.Vibrant?.getRgb() || null,
        lightVibrant: palette.LightVibrant?.getRgb() || null,
        darkVibrant: palette.DarkVibrant?.getRgb() || null,
        muted: palette.Muted?.getRgb() || null,
        lightMuted: palette.LightMuted?.getRgb() || null,
        darkMuted: palette.DarkMuted?.getRgb() || null
      } || null
    );
  };

  params = (Key: string): AWS.S3.HeadObjectRequest => ({
    Bucket: this.bucket,
    Key
  });

  /**
   * Returns the file path for a cached SVG.
   */
  svgPath = (
    filename: string,
    size: string = `original`,
    color: Color = `vibrant`
  ) => `${size}/${color}${filename.replace(/\.[^/.]+$/, `.svg`)}`;

  getSVG: GetSVG = async ({
    id: filename,
    size,
    color = `vibrant`,
    base64
  }) => {
    const path = this.svgPath(filename, size, color);
    const params = this.params(path);
    try {
      await this.S3?.headObject(params).promise();
      const uri = await this.getS3File(params);
      return base64 && uri
        ? this.encodeSvgDataUri(uri)
        : `${this.s3Base}/${this.bucket}/${path}`;
    } catch (err) {
      debug(`Existing file not found, creating...`);
    }
    try {
      const image = await this.traceImg(`${size}${filename}`, color);
      await this.saveImage(path, image);
      return base64
        ? this.encodeSvgDataUri(image)
        : `${this.s3Base}/${this.bucket}/${path}`;
    } catch (err) {
      error(`An error occured while attempting to upload an image to S3`, err);
      return null;
    }
  };

  getS3File = async (params: ReturnType<Images["params"]>) => {
    const res = await this.S3?.getObject(params, (err: Error) => {
      if (err) error(`Unable to retrieve file!`, err);
    }).promise();
    return res?.Body?.toString();
  };

  saveImage = (path: string, image: string) => {
    const params = this.params(path);
    if (params) {
      return this.S3?.upload({
        ...params,
        Body: image,
        ACL: `public-read`
      }).promise();
    }
  };

  traceImg = async (path: string, color: Color) =>
    this.optimizeSvg(await this.traceSvg(`${this.baseURL}${path}`, color));

  traceSvg = (
    url: Parameters<typeof Vibrant.from>[0],
    color: Color
  ): Promise<string> =>
    new Promise(async (resolve, reject) => {
      const colors = await this.extractColor(url);
      if (colors) {
        const trace: typeof Potrace = new Potrace({
          turdSize: 150,
          color: `rgb(${colors[color] || [0, 0, 0]})`
        });
        //eslint-disable-next-line
        trace.loadImage(url, (err: Error) =>
          err ? reject(err) : resolve(trace.getSVG() as string)
        );
      } else {
        reject(Error(`Could not trace SVG`));
        return null;
      }
    });

  optimizeSvg = async (svg: string) => {
    const svgo = new SVGO({ floatPrecision: 0 });
    const { data } = await svgo.optimize(svg);
    return data;
  };

  encodeSvgDataUri = (svg: string): string => {
    const datauri = new DataURI();
    datauri.format(`.svg`, svg);
    return datauri.content;
  };
}
