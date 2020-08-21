import { Resolver } from "../Resolver";

export const crew: Resolver<
  { credits: { crew: { id: string; job: string }[] } },
  { limit: number }
> = ({ credits }, { limit }) =>
  Object.values(
    credits.crew.reduce((hash, { id, job, ...rest }) => {
      if (hash[id]) {
        hash[id].job.push(job);
      } else {
        hash[id] = { id, job: [job], ...rest };
      }
      return hash;
    }, Object.create(null))
  ).slice(0, limit ? limit : credits.crew.length) || [];
