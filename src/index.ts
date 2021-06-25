import { lambdaServer } from "./server"

export { lambdaServer, serverConfig } from "./server"
export { models } from "./models"
export { typeDefs, schema, getSchemaIntrospection } from "./schema"
export { dataSources } from "./sources"
export { playground } from "./playground"

/** @deprecated Use `lambdaServer` instead or create your own Apollo server config useing `schema`, `dataSources`, and `models` */
export const server = lambdaServer
