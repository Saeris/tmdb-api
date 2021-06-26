export const limitResults = async <A = any>(
  limit: number,
  arr: Promise<A[]>
): Promise<A[]> => {
  const results = await arr
  return results.slice(0, limit ? limit : results.length) || []
}
