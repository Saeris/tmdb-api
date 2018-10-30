export { file, original, custom, svg, colors } from "./image"

export const small = (id, _, { dataSources }) => dataSources.Images.w45(id)
export const medium = (id, _, { dataSources }) => dataSources.Images.w185(id)
export const large = (id, _, { dataSources }) => dataSources.Images.h632(id)
