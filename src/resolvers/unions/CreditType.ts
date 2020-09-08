export const __resolveType = (result: Record<string, string>) =>
  result.credit_type === `cast` ? `Cast` : `Crew`
