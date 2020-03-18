import {
  ApolloError,
  AuthenticationError,
  ForbiddenError
} from "apollo-server-lambda";
import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import { Response } from "apollo-server-env";
import { GraphQLResolveInfo } from "graphql";
import { Context } from "../";
import { logObj } from "../utils";

type APIRequest<Params = Record<any, any>> = (
  params: Params,
  info: GraphQLResolveInfo
) => Promise<any>;

interface ByID {
  id: string;
}

interface BySeason {
  show: string;
  season: string;
}

interface ByEpisode extends BySeason {
  episode: string;
}

export class MovieDB extends RESTDataSource<Context> {
  baseURL = `https://api.themoviedb.org/3/`;

  extractTTL = (info: GraphQLResolveInfo, init = {}) =>
    Object.assign(init, {
      cacheOptions: { ttl: info?.cacheControl?.cacheHint?.maxAge || 0 }
    });

  async didReceiveResponse<TResult = any>(
    response: Response
  ): Promise<TResult> {
    if (response.ok) return (this.parseBody(response) as unknown) as TResult;
    throw await this.errorFromResponse(response);
  }

  willSendRequest(request: RequestOptions) {
    const apiKey = process.env.MOVIE_DB_API_KEY;
    if (apiKey) {
      request.params.append(`api_key`, apiKey);
    } else {
      // eslint-disable-next-line no-console
      console.error(`Environment Variable MOVIE_DB_API_KEY is missing!`);
    }
  }

  didEncounterError(err: Error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to send request:`, err.stack);
    throw err;
  }

  async errorFromResponse(response: Response) {
    const endpoint = response.url
      .substring(0, response.url.indexOf(`?`))
      .replace(this.baseURL, ``);
    const body = (await this.parseBody(response)) as Record<any, any>;
    const message = `${response.status} ${response.statusText}: ${body.status_message}`;
    const err =
      response.status === 401
        ? new AuthenticationError(message)
        : response.status === 403
        ? new ForbiddenError(message)
        : new ApolloError(message);

    Object.assign(err.extensions, {
      response: {
        url: response.url,
        status: response.status,
        statusText: response.statusText,
        body
      }
    });

    // eslint-disable-next-line no-console
    console.error(
      `Request to resource "${endpoint}" resulted in:\n\n${err.stack}\n`
    );
    return err;
  }

  movie: APIRequest<ByID> = ({ id, ...params }, info) =>
    this.get(
      `movie/${id}`,
      {
        append_to_response: `credits,images,keywords,videos,external_ids,similar`,
        ...params
      },
      this.extractTTL(info)
    );

  movieCredits: APIRequest<ByID> = ({ id, ...params }, info) =>
    this.get(`movie/${id}/credits`, { ...params }, this.extractTTL(info));

  similarMovies: APIRequest<ByID> = ({ id, ...params }, info) =>
    this.get(`movie/${id}/similar`, { ...params }, this.extractTTL(info));

  movieSocialMedia: APIRequest<ByID> = ({ id, ...params }, info) =>
    this.get(`movie/${id}/external_ids`, { ...params }, this.extractTTL(info));

  movieImages: APIRequest<ByID> = ({ id, ...params }, info) =>
    this.get(`movie/${id}/images`, { ...params }, this.extractTTL(info));

  movieKeywords: APIRequest<ByID> = ({ id, ...params }, info) =>
    this.get(`movie/${id}/keywords`, { ...params }, this.extractTTL(info));

  movieVideos: APIRequest<ByID> = ({ id, ...params }, info) =>
    this.get(`movie/${id}/videos`, { ...params }, this.extractTTL(info));

  person: APIRequest<ByID> = ({ id, ...params }, info) =>
    this.get(
      `person/${id}`,
      { append_to_response: `combined_credits,images,external_ids`, ...params },
      this.extractTTL(info)
    );

  personCredits: APIRequest<ByID> = ({ id, ...params }, info) =>
    this.get(
      `person/${id}/combined_credits`,
      { ...params },
      this.extractTTL(info)
    );

  personSocialMedia: APIRequest<ByID> = ({ id, ...params }, info) =>
    this.get(`person/${id}/external_ids`, { ...params }, this.extractTTL(info));

  personImages: APIRequest<ByID> = ({ id, ...params }, info) =>
    this.get(`person/${id}/images`, { ...params }, this.extractTTL(info));

  network: APIRequest<ByID> = ({ id, ...params }, info) =>
    this.get(`network/${id}`, { ...params }, this.extractTTL(info));

  networkImages: APIRequest<ByID> = ({ id, ...params }, info) =>
    this.get(`network/${id}/images`, { ...params }, this.extractTTL(info));

  company: APIRequest<ByID> = ({ id, ...params }, info) =>
    this.get(`company/${id}`, { ...params }, this.extractTTL(info));

  companyImages: APIRequest<ByID> = ({ id, ...params }, info) =>
    this.get(`company/${id}/images`, { ...params }, this.extractTTL(info));

  tv: APIRequest<ByID> = ({ id, ...params }, info) =>
    this.get(
      `tv/${id}`,
      {
        append_to_response: `credits,images,keywords,videos,external_ids,recommendations,similar`,
        ...params
      },
      this.extractTTL(info)
    );

  tvCredits: APIRequest<ByID> = ({ id, ...params }, info) =>
    this.get(`tv/${id}/credits`, { ...params }, this.extractTTL(info));

  similarShows: APIRequest<ByID> = ({ id, ...params }, info) =>
    this.get(`tv/${id}/similar`, { ...params }, this.extractTTL(info));

  tvSocialMedia: APIRequest<ByID> = ({ id, ...params }, info) =>
    this.get(`tv/${id}/external_ids`, { ...params }, this.extractTTL(info));

  tvImages: APIRequest<ByID> = ({ id, ...params }, info) =>
    this.get(`tv/${id}/images`, { ...params }, this.extractTTL(info));

  tvKeywords: APIRequest<ByID> = ({ id, ...params }, info) =>
    this.get(`tv/${id}/keywords`, { ...params }, this.extractTTL(info));

  tvVideos: APIRequest<ByID> = ({ id, ...params }, info) =>
    this.get(`tv/${id}/videos`, { ...params }, this.extractTTL(info));

  season: APIRequest<BySeason> = ({ show, season, ...params }, info) =>
    this.get(
      `tv/${show}/season/${season}`,
      { ...params },
      this.extractTTL(info)
    );

  seasonCredits: APIRequest<BySeason> = ({ show, season, ...params }, info) =>
    this.get(
      `tv/${show}/season/${season}/credits`,
      { ...params },
      this.extractTTL(info)
    );

  seasonImages: APIRequest<BySeason> = ({ show, season, ...params }, info) =>
    this.get(
      `tv/${show}/season/${season}/images`,
      { ...params },
      this.extractTTL(info)
    );

  seasonVideos: APIRequest<BySeason> = ({ show, season, ...params }, info) =>
    this.get(
      `tv/${show}/season/${season}/videos`,
      { ...params },
      this.extractTTL(info)
    );

  episode: APIRequest<ByEpisode> = (
    { show, season, episode, ...params },
    info
  ) =>
    this.get(
      `tv/${show}/season/${season}/episode/${episode}`,
      { ...params },
      this.extractTTL(info)
    );

  episodeCredits: APIRequest<ByEpisode> = (
    { show, season, episode, ...params },
    info
  ) =>
    this.get(
      `tv/${show}/season/${season}/episode/${episode}/credits`,
      { ...params },
      this.extractTTL(info)
    );

  episodeImages: APIRequest<ByEpisode> = (
    { show, season, episode, ...params },
    info
  ) =>
    this.get(
      `tv/${show}/season/${season}/episode/${episode}/images`,
      { ...params },
      this.extractTTL(info)
    );

  episodeVideos: APIRequest<ByEpisode> = (
    { show, season, episode, ...params },
    info
  ) =>
    this.get(
      `tv/${show}/season/${season}/episode/${episode}/videos`,
      { ...params },
      this.extractTTL(info)
    );

  search: APIRequest = (params = {}, info) => {
    logObj(params);
    return this.get(`search/multi`, { ...params }, this.extractTTL(info));
  };

  searchMovies: APIRequest = (params = {}, info) =>
    this.get(`search/movie`, { ...params }, this.extractTTL(info));

  searchTVShows: APIRequest = (params = {}, info) =>
    this.get(`search/tv`, { ...params }, this.extractTTL(info));

  searchPeople: APIRequest = (params = {}, info) =>
    this.get(`search/person`, { ...params }, this.extractTTL(info));

  popularMovies: APIRequest = (params = {}, info) =>
    this.get(`movie/popular`, { ...params }, this.extractTTL(info));

  popularPeople: APIRequest = (params = {}, info) =>
    this.get(`person/popular`, { ...params }, this.extractTTL(info));

  popularTV: APIRequest = (params = {}, info) =>
    this.get(`tv/popular`, { ...params }, this.extractTTL(info));

  nowPlaying: APIRequest = (params = {}, info) =>
    this.get(`movie/now_playing`, { ...params }, this.extractTTL(info));

  topRatedMovies: APIRequest = (params = {}, info) =>
    this.get(`movie/top_rated`, { ...params }, this.extractTTL(info));

  upcomingMovies: APIRequest = (params = {}, info) =>
    this.get(`movie/upcoming`, { ...params }, this.extractTTL(info));

  airingThisWeek: APIRequest = (params = {}, info) =>
    this.get(`tv/on_the_air`, { ...params }, this.extractTTL(info));

  airingToday: APIRequest = (params = {}, info) =>
    this.get(`tv/airing_today`, { ...params }, this.extractTTL(info));

  topRatedTV: APIRequest = (params = {}, info) =>
    this.get(`tv/top_rated`, { ...params }, this.extractTTL(info));
}
