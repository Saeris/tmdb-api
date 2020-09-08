export type Gender = `Unknown` | `Female` | `Male`

export const getGender = (gender?: number): Gender => {
  switch (gender) {
    case 1:
      return `Female`
    case 2:
      return `Male`
    default:
      return `Unknown`
  }
}
