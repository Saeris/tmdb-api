export const __resolveType = result => {
  if (result.media_type === `movie`) return `Movie`
  if (result.media_type === `tv`) return `TV`
}
