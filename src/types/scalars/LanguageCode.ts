import { regularExpressionFactory } from "@saeris/graphql-scalars"

const { scalar, resolver } = regularExpressionFactory({
  name: `LanguageCode`,
  regex: /([a-z]{2})-([A-Z]{2})/
})

export {
  scalar as LanguageCodeScalar,
  resolver as LanguageCode
}
