import { Resolver } from "../Resolver";
import { filterResults } from "../../utils";

export const videos: Resolver<
  { videos: { results: any[] } },
  { filter: Record<any, any> }
> = ({ videos: { results } }, { filter = {} }) =>
  results.filter(filterResults, filter) || [];
