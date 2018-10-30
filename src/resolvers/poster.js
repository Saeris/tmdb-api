export { file, original, custom, svg, colors } from "./image"

export const thumbnail = (id, _, { dataSources }) => dataSources.Images.w92(id)
export const tiny = (id, _, { dataSources }) => dataSources.Images.w154(id)
export const small = (id, _, { dataSources }) => dataSources.Images.w185(id)
export const medium = (id, _, { dataSources }) => dataSources.Images.w342(id)
export const large = (id, _, { dataSources }) => dataSources.Images.w500(id)
export const huge = (id, _, { dataSources }) => dataSources.Images.w780(id)
