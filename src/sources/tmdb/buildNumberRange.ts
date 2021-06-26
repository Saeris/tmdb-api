export interface NumberRange {
  min?: number
  max?: number
}

export const buildNumberRange = (
  field: string,
  numberRange?: NumberRange
): { [key: string]: number } => {
  const filter: { [key: string]: number } = {}
  if (numberRange) {
    if (numberRange.min) filter[`${field}.gte`] = numberRange.min
    if (numberRange.max) filter[`${field}.lte`] = numberRange.max
  }
  return filter
}
