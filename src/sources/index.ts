import { DataSources } from "apollo-server-core/dist/graphqlOptions";
import { Context } from "../";
import { Images } from "./images";
import { MovieDB } from "./movieDB";

export { Color, SVGResult, ImageResult, ColorsResult } from "./images";

export interface Sources extends DataSources<Context> {
  Images: Images;
  MovieDB: MovieDB;
}

export const dataSources = (): Sources => ({
  Images: new Images(),
  MovieDB: new MovieDB()
});
