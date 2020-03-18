import { groupBy } from "lodash";
import { Resolver } from "./shared";

export { gender } from "./shared";

type Member = "cast" | "crew";

const getCredits = (
  member: Member
): Resolver<
  {
    // eslint-disable-next-line camelcase
    combined_credits: Record<
      Member,
      // eslint-disable-next-line camelcase
      { id: string; media_type: "movie" | "tv" }[]
    >;
  },
  { limit?: number }
> => async (
  { combined_credits: credits },
  { limit },
  { dataSources },
  info
) => {
  const roles =
    credits[member].slice(0, limit ? limit : credits[member].length) || [];
  const grouped = groupBy(roles, `media_type`);
  const resolved = await Promise.all([
    grouped.movie.map(({ id, media_type: type }) =>
      dataSources.MovieDB[type]({ id }, info)
    ),
    grouped.tv.map(({ id, media_type: type }) =>
      dataSources.MovieDB[type]({ id }, info)
    )
  ]);
  return [
    ...resolved[0].map(movie => ({ ...movie, media_type: `movie` })),
    ...resolved[1].map(show => ({ ...show, media_type: `tv` }))
  ];
};

export const appearsIn = getCredits(`cast`);

export const workedOn = getCredits(`crew`);

export const photo = (parent: Record<string, string>) => parent.profile_path;
