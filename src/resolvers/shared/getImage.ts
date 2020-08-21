import { Color, ImageResult, ColorsResult } from "../../sources/images";
import { Resolver } from "../Resolver";

type Args = {
  color: Color;
  base64: boolean;
};

type OriginalArgs = {
  svg: boolean;
} & Args;

type Size = {
  size: string;
};

export const file = (id: string) => id;

export const original: Resolver<string, OriginalArgs, ImageResult> = (
  id,
  { svg = false, color = `vibrant`, base64 = false },
  { dataSources }
) => dataSources.Images.original({ id, svg, color, base64 });

export const custom: Resolver<string, Size & OriginalArgs, ImageResult> = (
  id,
  { size, svg = false, color = `vibrant`, base64 = false },
  { dataSources }
) => dataSources.Images.custom({ id, size, svg, color, base64 });

export const svg: Resolver<string, Size & Args, ImageResult> = (
  id,
  { size, color = `vibrant`, base64 = false },
  { dataSources }
) => dataSources.Images.svg({ id, size, color, base64 });

export const colors: Resolver<string, {}, ColorsResult> = (
  id,
  _,
  { dataSources }
) => dataSources.Images.colors(id);
