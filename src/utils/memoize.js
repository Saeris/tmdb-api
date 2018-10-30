const defaultStore = new Map()

export const cache = (key, value, store = defaultStore) =>
  store.get(key) || store.set(key, typeof value === `function` ? value() : value).get(key)

export const memoize = (fn, store = new Map()) => (...args) => cache(JSON.stringify(args), () => fn(...args), store)
