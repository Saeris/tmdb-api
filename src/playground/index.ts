import { Config } from "apollo-server-core"
import { fetchPopular } from "./fetchPopular"

const endpoint = `${
  process.env.OFFLINE ? `http://localhost:1337/` : process.env.URL
}${process.env.NETLIFY ? `.netlify/functions/mini-movie-db-api/` : `dev`}`

export const playground: Config["playground"] = {
  settings: {
    // @ts-ignore
    "schema.polling.interval": 10000
  },
  tabs: [
    {
      endpoint,
      query: fetchPopular,
      name: `fetchPopular`,
      variables: `{ "page": 1 }`
    }
  ]
}
