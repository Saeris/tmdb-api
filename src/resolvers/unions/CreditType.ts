export const __resolveType = (
  result: Record<string, string>
): "Cast" | "Crew" => (result.credit_type === `cast` ? `Cast` : `Crew`)
