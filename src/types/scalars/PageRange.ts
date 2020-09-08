import { rangeFactory } from "@saeris/graphql-scalars"

const { scalar, resolver } = rangeFactory({
  name: `PageRange`,
  start: 1,
  end: 1000
})

export {
	scalar as PageRangeScalar,
	resolver as PageRange
}
