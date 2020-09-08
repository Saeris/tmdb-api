export const removeEmpty = (obj: Record<any, any>) => {
  Object.entries(obj).forEach(
    ([key, val]) =>
      (val && typeof val === `object` && removeEmpty(val)) ||
      // eslint-disable-next-line no-undefined
      ((val === null || val === `` || val === undefined) && delete obj[key])
  )
  return obj
}
