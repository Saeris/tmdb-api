import { regularExpressionFactory } from "@saeris/graphql-scalars"

const { scalar, resolver } = regularExpressionFactory({
  name: `ISODate`,
  regex: /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])$/
})

export {
  scalar as ISODateScalar,
  resolver as ISODate
}
