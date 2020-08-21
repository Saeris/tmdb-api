import { Resolver } from "../Resolver";

export const cast: Resolver<{ credits: { cast: any[] } }, { limit: number }> = (
  { credits },
  { limit }
) => credits.cast.slice(0, limit ? limit : credits.cast.length) || [];
