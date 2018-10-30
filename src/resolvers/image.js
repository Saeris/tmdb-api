export const file = id => id
export const original = (id, { svg = false, color = `vibrant`, base64 = false }, { dataSources }) => dataSources.Images.original(id, svg, color, base64)
export const custom = (id, { size, svg = false, color = `vibrant`, base64 = false }, { dataSources }) => dataSources.Images.custom(id, size, svg, color, base64)
export const svg = (id, { size, color = `vibrant`, base64 = false }, { dataSources }) => dataSources.Images.svg(id, size, color, base64)
export const colors = (id, _, { dataSources }) => dataSources.Images.colors(id)
