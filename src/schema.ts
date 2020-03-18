import gql from "graphql-tag";
import { makeExecutableSchema, IResolvers } from "graphql-tools";
import schemaDirectives from "@saeris/graphql-directives";
import CustomScalars from "@saeris/graphql-scalars";
import * as types from "./types";
import * as enums from "./types/enums";
import * as inputs from "./types/inputs";
import * as interfaces from "./types/interfaces";
import * as unions from "./types/unions";
import * as resolvers from "./resolvers";

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
`;

const directives = Object.values(schemaDirectives).map(directive =>
  directive.declaration()
);

export const schema = makeExecutableSchema({
  typeDefs: [
    ...Object.values(types),
    ...Object.values(enums),
    ...Object.values(inputs),
    ...Object.values(interfaces),
    ...Object.values(unions),
    ...CustomScalars.keys(),
    cacheControlTypes,
    ...directives
  ],
  schemaDirectives,
  resolvers: {
    ...(CustomScalars.values() as Record<any, any>),
    ...(resolvers as IResolvers<any, any>)
  },
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  inheritResolversFromInterfaces: true
});

export default schema;
