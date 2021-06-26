import { regularExpressionFactory } from "@saeris/graphql-scalars"

const { scalar, resolver } = regularExpressionFactory({
  name: `RegionCode`,
  regex: /^[A-Z]{2}$/
})

export { scalar as RegionCodeScalar, resolver as RegionCode }
