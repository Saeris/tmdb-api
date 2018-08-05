//import { writeFileSync } from "fs"
//import { graphql, introspectionQuery } from "graphql"
import { makeExecutableSchema } from "graphql-tools"
import * as types from "./types"
import * as enums from "./types/enums"
import * as inputs from "./types/inputs"
import * as unions from "./types/unions"
import * as resolvers from "./resolvers"

export const schema = makeExecutableSchema({
  typeDefs: [...Object.values(types), ...Object.values(enums), ...Object.values(inputs), ...Object.values(unions)],
  resolvers
})

/*
const exportSchema = async () => {
  try {
    const result = await graphql(schema, introspectionQuery)
    if (result.errors) throw new Error(result.errors)
    writeFileSync(`./schema.json`, JSON.stringify(result, null, 2))
    info(`Successfuly exported schema.`)
  } catch (err) {
    error(`Error during introspection: \n${JSON.stringify(err, null, 2)}`)
  }
}

if (process.env.IS_OFFLINE) exportSchema()
//*/

export default schema
