export interface StringFilter {
  include?: string[]
  exclude?: string[]
}

export const buildStringFilter = (field: string, stringFilter?: StringFilter) => {
  const filter: { [key: string]: string[] } = {}
  if (stringFilter) {
    if (stringFilter.include) filter[`with_${field}`] = stringFilter.include
    if (stringFilter.exclude) filter[`without_${field}`] = stringFilter.exclude
  }
  return filter
}
