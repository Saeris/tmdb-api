export const setLanguage = <
  A extends any[],
  T extends (...args: A) => ReturnType<T>
>(
  fn: T
) => (...args: A): ReturnType<T> => {
  if (args[1].language) {
    args[2].language = args[1].language
  } else if (args[1].filter.language) {
    args[2].language = args[1].filter.language
  }
  return fn(...args)
}
