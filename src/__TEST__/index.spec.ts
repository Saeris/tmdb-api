import { handler } from "../../lambda/tmdb-api"

describe(`handler`, () => {
  it(`should be a function`, () => {
    expect(typeof handler).toBe(`function`)
  })
})
