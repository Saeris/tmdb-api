export function filterResults<Filter, T>(this: Filter, result: T) {
  return Object.entries(this).every(([field, value]) =>
    Array.isArray(value)
      ? value.includes(result[field as keyof T])
      : result[field as keyof T] === value
  )
}
