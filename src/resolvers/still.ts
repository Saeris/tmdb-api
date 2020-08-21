import { ImageResult } from "../sources/images";
import { Resolver } from "./Resolver";

export { file, original, custom, svg, colors } from "./shared";

export const small: Resolver<string, {}, ImageResult> = (
  id,
  _,
  { dataSources }
) => dataSources.Images.w92({ id });

export const medium: Resolver<string, {}, ImageResult> = (
  id,
  _,
  { dataSources }
) => dataSources.Images.w185({ id });

export const large: Resolver<string, {}, ImageResult> = (
  id,
  _,
  { dataSources }
) => dataSources.Images.w300({ id });
