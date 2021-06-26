export const __resolveType = (
  result: Record<string, string>
): "Movie" | "TV" | undefined => {
  if (result.media_type === `movie`) return `Movie`
  if (result.media_type === `tv`) return `TV`
}
