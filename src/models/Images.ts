import { Color, ColorsResult, ImageResult } from "../sources/images"
import { Resolver } from "../resolvers/utils"

type Args = {
  color: Color
  base64: boolean
}

type OriginalArgs = {
  svg: boolean
} & Args

type Size = {
  size: string
}

export class ImageType {
  [key: string]: any
  file: string
	static custom: Resolver<
    ImageType,
    Size & OriginalArgs,
    ImageResult
  > = (
    { file: id },
    { size, svg = false, color = `vibrant`, base64 = false },
    { dataSources }
  ) => dataSources.Images.custom({ id, size, svg, color, base64 })

  static original: Resolver<
    ImageType,
    OriginalArgs,
    ImageResult
  > = (
    { file: id },
    { svg = false, color = `vibrant`, base64 = false },
    { dataSources }
  ) => dataSources.Images.original({ id, svg, color, base64 })

  static svg: Resolver<ImageType, Size & Args, ImageResult> = (
    { file: id },
    { size, color = `vibrant`, base64 = false },
    { dataSources }
  ) => dataSources.Images.svg({ id, size, color, base64 })

  static colors: Resolver<ImageType, {}, ColorsResult> = (
    { file: id },
    _,
    { dataSources }
  ) => dataSources.Images.colors(id)

  constructor(url: string) {
    this.file = url
  }
}

export class Backdrop extends ImageType {
  [key: string]: any
  static small: Resolver<Backdrop, {}, ImageResult> = (
    { file: id },
    _,
    { dataSources }
  ) => dataSources.Images.w300({ id })

  static medium: Resolver<Backdrop, {}, ImageResult> = (
    { file: id },
    _,
    { dataSources }
  ) => dataSources.Images.w780({ id })

  static large: Resolver<Backdrop, {}, ImageResult> = (
    { file: id },
    _,
    { dataSources }
  ) => dataSources.Images.w1280({ id })

  constructor(init: Backdrop) {
    // eslint-disable-next-line camelcase
    super(init?.file_path || init)
    if (typeof init === `object`) {
      Object.assign(this, init)
    }
  }
}

export class Logo extends ImageType {
  [key: string]: any
  static icon: Resolver<Logo, {}, ImageResult> = (
    { file: id },
    _,
    { dataSources }
  ) => dataSources.Images.w45({ id })

  static tiny: Resolver<Logo, {}, ImageResult> = (
    { file: id },
    _,
    { dataSources }
  ) => dataSources.Images.w92({ id })

  static small: Resolver<Logo, {}, ImageResult> = (
    { file: id },
    _,
    { dataSources }
  ) => dataSources.Images.w154({ id })

  static medium: Resolver<Logo, {}, ImageResult> = (
    { file: id },
    _,
    { dataSources }
  ) => dataSources.Images.w185({ id })

  static large: Resolver<Logo, {}, ImageResult> = (
    { file: id },
    _,
    { dataSources }
  ) => dataSources.Images.w300({ id })

  static huge: Resolver<Logo, {}, ImageResult> = (
    { file: id },
    _,
    { dataSources }
  ) => dataSources.Images.w500({ id })

  constructor(init: Logo) {
    // eslint-disable-next-line camelcase
    super(init?.file_path || init)
    if (typeof init === `object`) {
      Object.assign(this, init)
    }
  }
}

export class Photo extends ImageType {
  [key: string]: any
  static small: Resolver<Photo, {}, ImageResult> = (
    { file: id },
    _,
    { dataSources }
  ) => dataSources.Images.w45({ id })

  static medium: Resolver<Photo, {}, ImageResult> = (
    { file: id },
    _,
    { dataSources }
  ) => dataSources.Images.w185({ id })

  static large: Resolver<Photo, {}, ImageResult> = (
    { file: id },
    _,
    { dataSources }
  ) => dataSources.Images.h632({ id })

  constructor(init: Photo) {
    // eslint-disable-next-line camelcase
    super(init?.file_path || init)
    if (typeof init === `object`) {
      Object.assign(this, init)
    }
  }
}

export class Poster extends ImageType {
  [key: string]: any
  static thumbnail: Resolver<Poster, {}, ImageResult> = (
    { file: id },
    _,
    { dataSources }
  ) => dataSources.Images.w92({ id })

  static tiny: Resolver<Poster, {}, ImageResult> = (
    { file: id },
    _,
    { dataSources }
  ) => dataSources.Images.w154({ id })

  static small: Resolver<Poster, {}, ImageResult> = (
    { file: id },
    _,
    { dataSources }
  ) => dataSources.Images.w185({ id })

  static medium: Resolver<Poster, {}, ImageResult> = (
    { file: id },
    _,
    { dataSources }
  ) => dataSources.Images.w342({ id })

  static large: Resolver<Poster, {}, ImageResult> = (
    { file: id },
    _,
    { dataSources }
  ) => dataSources.Images.w500({ id })

  static huge: Resolver<Poster, {}, ImageResult> = (
    { file: id },
    _,
    { dataSources }
  ) => dataSources.Images.w780({ id })


  constructor(init: Poster) {
    // eslint-disable-next-line camelcase
    super(init?.file_path || init)
    if (typeof init === `object`) {
      Object.assign(this, init)
    }
  }
}

export class Still extends ImageType {
  [key: string]: any
  static small: Resolver<Still, {}, ImageResult> = (
    { file: id },
    _,
    { dataSources }
  ) => dataSources.Images.w92({ id })

  static medium: Resolver<Still, {}, ImageResult> = (
    { file: id },
    _,
    { dataSources }
  ) => dataSources.Images.w185({ id })

  static large: Resolver<Still, {}, ImageResult> = (
    { file: id },
    _,
    { dataSources }
  ) => dataSources.Images.w300({ id })

  constructor(init: Still) {
    // eslint-disable-next-line camelcase
    super(init?.file_path || init)
    if (typeof init === `object`) {
      Object.assign(this, init)
    }
  }
}
