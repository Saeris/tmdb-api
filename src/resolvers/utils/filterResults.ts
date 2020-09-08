export function filterResults<Filter, T>(this: Filter, result: T) {
  return Object.entries(this).every(([field, value]) =>
    Array.isArray(value)
      ? value.indexOf(result[field as keyof T]) > -1
      : result[field as keyof T] === value
  );
}
