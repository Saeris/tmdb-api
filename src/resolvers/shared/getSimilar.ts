import { Resolver } from "./types";

export const similar: Resolver<
  { similar: { results: any[] } },
  { limit: number }
> = ({ similar: { results } }, { limit }) =>
  results.slice(0, limit ? limit : results.length) || [];
