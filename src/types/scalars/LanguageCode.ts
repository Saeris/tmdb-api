import { regularExpressionFactory } from "@saeris/graphql-scalars"

const { scalar, resolver } = regularExpressionFactory({
  name: `LanguageCode`,
  // eslint-disable-next-line prefer-named-capture-group
  regex: /([a-z]{2})-([A-Z]{2})/
})

export { scalar as LanguageCodeScalar, resolver as LanguageCode }
