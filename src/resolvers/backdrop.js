export { file, original, custom, svg, colors } from "./image"

export const small = (id, _, { dataSources }) => dataSources.Images.w300(id)
export const medium = (id, _, { dataSources }) => dataSources.Images.w780(id)
export const large = (id, _, { dataSources }) => dataSources.Images.w1280(id)
