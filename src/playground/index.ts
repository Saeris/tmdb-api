import { Config } from "apollo-server-core"
import { discoverMovies } from "./discoverMovies"
import { discoverTV } from "./discoverTV"
import { fetchPopular } from "./fetchPopular"
import { getMovie } from "./getMovie"
import { getReview } from "./getReview"
import { searchMovies } from "./searchMovies"
import { trending } from "./trending"

const isDev = !!process.env.OFFLINE

const endpoint = `${
  process.env.OFFLINE ? `http://localhost:1337/` : `${process.env.URL}/`
}${process.env.NETLIFY ? `.netlify/functions/tmdb-api/` : `dev`}`

export const playground: Config["playground"] = {
  settings: {
    // @ts-ignore
    "schema.polling.enable": isDev,
    // @ts-ignore
    "schema.polling.interval": 15000
  },
  tabs: [
    {
      endpoint,
      query: fetchPopular,
      name: `fetchPopular`
    },
    {
      endpoint,
      query: discoverTV,
      name: `discoverTV`
    },
    {
      endpoint,
      query: discoverMovies,
      name: `discoverMovies`
    },
    {
      endpoint,
      query: trending,
      name: `trending`
    },
    {
      endpoint,
      query: getMovie,
      name: `getMovie`
    },
    {
      endpoint,
      query: getReview,
      name: `getReview`
    },
    {
      endpoint,
      query: searchMovies,
      name: `searchMovies`
    }
  ]
}
