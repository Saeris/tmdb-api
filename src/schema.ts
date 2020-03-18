import gql from "graphql-tag";
import { makeExecutableSchema, IResolvers } from "graphql-tools";
import { Numbers, Dates, Strings } from "@saeris/graphql-directives";
import {
  DateTimeScalar,
  DateTime,
  EmailAddressScalar,
  EmailAddress,
  URLScalar,
  URL
} from "@saeris/graphql-scalars";
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

const schemaDirectives = {
  ...Numbers,
  ...Dates,
  ...Strings
};

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
    DateTimeScalar,
    EmailAddressScalar,
    URLScalar,
    cacheControlTypes,
    ...directives
  ],
  schemaDirectives,
  resolvers: {
    DateTime,
    EmailAddress,
    URL,
    ...(resolvers as IResolvers<any, any>)
  },
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  inheritResolversFromInterfaces: true
});

export default schema;
