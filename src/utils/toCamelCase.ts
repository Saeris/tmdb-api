export const toCamelCase = (str: string): string =>
  str.replace(/_(?<char>[a-z])/g, (g) => g[1].toUpperCase())
