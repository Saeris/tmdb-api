export const __resolveType = (
  result: Record<string, string>
): "Movie" | "TV" | "Person" | undefined => {
  if (result.media_type === `movie`) return `Movie`
  if (result.media_type === `tv`) return `TV`
  if (!result.media_type) return `Person`
}
