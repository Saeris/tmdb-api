import { handler } from "../../lambda/tmdb-api"

const wait = async (ms = 0) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

describe(`handler`, () => {
  it(`should be a function`, async () => {
    expect(typeof handler).toBe(`function`)
    // Dumb workaround for Jimp because of dynamic dependency loading in this file:
    // https://github.com/jtlapp/gifwrap/blob/da9b9ca6f3261f3d06ba1d101059463774ddd12c/src/gifcodec.js#L6-L8
    // For solution, see: https://github.com/facebook/jest/issues/6434#issuecomment-689083905
    // Also referencing: https://stackoverflow.com/questions/67178109/jest-throwing-reference-error-about-an-import-inside-a-node-modules-dependency
    await wait()
    await wait()
  })
})
