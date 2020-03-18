import { ImageResult } from "../sources";
import { Resolver } from "./shared";

export { file, original, custom, svg, colors } from "./shared";

export const thumbnail: Resolver<string, {}, ImageResult> = (
  id,
  _,
  { dataSources }
) => dataSources.Images.w92({ id });

export const tiny: Resolver<string, {}, ImageResult> = (
  id,
  _,
  { dataSources }
) => dataSources.Images.w154({ id });

export const small: Resolver<string, {}, ImageResult> = (
  id,
  _,
  { dataSources }
) => dataSources.Images.w185({ id });

export const medium: Resolver<string, {}, ImageResult> = (
  id,
  _,
  { dataSources }
) => dataSources.Images.w342({ id });

export const large: Resolver<string, {}, ImageResult> = (
  id,
  _,
  { dataSources }
) => dataSources.Images.w500({ id });

export const huge: Resolver<string, {}, ImageResult> = (
  id,
  _,
  { dataSources }
) => dataSources.Images.w780({ id });
