import {
  buildSchemaFromTypeDefinitions,
  makeExecutableSchema,
  IResolvers,
  SchemaDirectiveVisitor
} from "graphql-tools"
import { Numbers, Dates, Strings } from "@saeris/graphql-directives"
import {
  DateTimeScalar,
  DateTime,
  EmailAddressScalar,
  EmailAddress,
  URLScalar,
  URL
} from "@saeris/graphql-scalars"
import { types, scalarResolvers } from "./types"
import { resolvers } from "./resolvers"

// TODO: Re-Write Schema Definition to remove makeExecutableSchema entirely
// to conform to Apollo Server's standard implementation
const cacheControlTypes = `
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
  ) on FIELD_DEFINITION | OBJECT | INTERFACE
`

const schemaDirectives = {
  ...Numbers,
  ...Dates,
  ...Strings
}

const directives = Object.values(schemaDirectives).map((directive) =>
  directive.toDocumentNode()
)

export const typeDefs = [
  ...types,
  DateTimeScalar,
  EmailAddressScalar,
  URLScalar,
  cacheControlTypes,
  ...directives
]

export const getSchemaIntrospection = () =>
  buildSchemaFromTypeDefinitions(typeDefs)

export const schema = makeExecutableSchema({
  typeDefs,
  schemaDirectives: (schemaDirectives as unknown) as Record<
    string,
    typeof SchemaDirectiveVisitor
  >,
  resolvers: {
    DateTime,
    EmailAddress,
    URL,
    ...scalarResolvers,
    ...(resolvers as IResolvers<any, any>)
  },
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  inheritResolversFromInterfaces: true
})
