import { Images } from "./images"
import { MovieDB } from "./movieDB"

export default () => ({
  Images: new Images(),
  MovieDB: new MovieDB()
})
