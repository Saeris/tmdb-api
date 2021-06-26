export const __resolveType = (
  result: Record<string, string>
): "Poster" | "Backdrop" | undefined => {
  if (result.imageType === `poster`) return `Poster`
  if (result.imageType === `backdrop`) return `Backdrop`
}
