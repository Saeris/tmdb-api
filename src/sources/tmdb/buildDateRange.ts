export interface DateRange {
  from?: Date
  to?: Date
}

export const buildDateRange = (field: string, dateRange?: DateRange) => {
  const filter: { [key: string]: Date } = {}
  if (dateRange) {
    if (dateRange.from) filter[`${field}.gte`] = dateRange.from
    if (dateRange.to) filter[`${field}.lte`] = dateRange.to
  }
  return filter
}
