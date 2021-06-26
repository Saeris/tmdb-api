import { rangeFactory } from "@saeris/graphql-scalars"

const { scalar, resolver } = rangeFactory({
  name: `ScoreMinimumRange`,
  start: 0,
  end: 10
})

export { scalar as ScoreMinimumRangeScalar, resolver as ScoreMinimumRange }
