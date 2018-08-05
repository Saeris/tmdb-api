export function filterResults(result) {
  return Object.entries(this).every(([field, value]) => (Array.isArray(value) ? value.indexOf(result[field]) > -1 : result[field] === value))
}
