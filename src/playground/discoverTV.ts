export const discoverTV = `query DiscoverTV {
  discoverTV(filter: {  firstAiredYear: 2020 }) {
    id
    name
    overview
    firstAired
    poster {
      large
    }
  }
}
` as const
