import { handler } from "../../lambda/mini-movie-db-api";

describe(`handler`, () => {
  it(`should be a function`, () => {
    expect(typeof handler).toBe(`function`);
  });
});
