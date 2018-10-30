//import { writeFileSync } from "fs"
//import { graphql, introspectionQuery } from "graphql"
import { makeExecutableSchema } from "graphql-tools"
import { gql } from "apollo-server-lambda"
import {
  GraphQLDateDirective,
  GraphQLNumberDirective,
  GraphQLCurrencyDirective,
  GraphQLLowerCaseDirective,
  GraphQLUpperCaseDirective,
  GraphQLCamelCaseDirective,
  GraphQLStartCaseDirective,
  GraphQLCapitalizeDirective,
  GraphQLKebabCaseDirective,
  GraphQLTrimDirective,
  GraphQLDefaultToDirective,
  GraphQLToLowerDirective,
  GraphQLToUpperDirective,
  GraphQLTemplateDirective,
  applySchemaCustomDirectives
} from "graphql-custom-directives"
import CustomScalars from "@saeris/graphql-scalars"
import * as types from "./types"
import * as enums from "./types/enums"
import * as inputs from "./types/inputs"
import * as interfaces from "./types/interfaces"
import * as unions from "./types/unions"
import * as resolvers from "./resolvers"

// TODO: Re-Write Schema Definition to remove makeExecutableSchema entirely
// to conform to Apollo Server's standard implementation
const cacheControlTypes = gql`
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
  ) on FIELD_DEFINITION | OBJECT | INTERFACE
`

export const schema = makeExecutableSchema({
  typeDefs: [
    ...Object.values(types),
    ...Object.values(enums),
    ...Object.values(inputs),
    ...Object.values(interfaces),
    ...Object.values(unions),
    cacheControlTypes,
    ...CustomScalars.keys()
  ],
  resolvers: {
    ...CustomScalars.values(),
    ...resolvers
  },
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  inheritResolversFromInterfaces: true
})

const directives = [
  GraphQLDateDirective,
  GraphQLNumberDirective,
  GraphQLCurrencyDirective,
  GraphQLLowerCaseDirective,
  GraphQLUpperCaseDirective,
  GraphQLCamelCaseDirective,
  GraphQLStartCaseDirective,
  GraphQLCapitalizeDirective,
  GraphQLKebabCaseDirective,
  GraphQLTrimDirective,
  GraphQLDefaultToDirective,
  GraphQLToLowerDirective,
  GraphQLToUpperDirective,
  GraphQLTemplateDirective
]

schema._directives.push(...directives)
applySchemaCustomDirectives(schema)

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
