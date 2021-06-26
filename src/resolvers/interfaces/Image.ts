export const __resolveType = (
  result: Record<string, string>
): "Poster" | "Backdrop" | "Logo" | "Photo" | "Still" | undefined => {
  if (result.imageType === `logo`) return `Logo`
  if (result.imageType === `photo`) return `Photo`
  if (result.imageType === `still`) return `Still`
  if (result.imageType === `poster`) return `Poster`
  if (result.imageType === `backdrop`) return `Backdrop`
}
