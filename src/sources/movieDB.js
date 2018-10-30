import { ApolloError, AuthenticationError, ForbiddenError } from 'apollo-server-lambda'
import { error } from "winston"
import { RESTDataSource } from 'apollo-datasource-rest'
import { logObj } from "../utils"

export class MovieDB extends RESTDataSource {
  baseURL = `https://api.themoviedb.org/3/`

  extractTTL = (info = {}, init = {}) => Object.assign(
    init,
    { cacheOptions: { ttl: info?.cacheControl?.cacheHint?.maxAge || 0 } }
  )

  async didReceiveResponse(response) {
    if (response.ok) return this.parseBody(response)
    throw await this.errorFromResponse(response)
  }

  willSendRequest(request) {
    request.params.append(`api_key`, process.env.MOVIE_DB_API_KEY)
  }

  didEncounterError(err) {
    error(`Failed to send request:`, err.stack)
    throw err
  }

  async errorFromResponse(response) {
    const endpoint = response.url.substring(0, response.url.indexOf(`?`)).replace(this.baseURL, ``)
    const body = await this.parseBody(response)
    const message = `${response.status} ${response.statusText}: ${body.status_message}`
    const err = response.status === 401
      ? new AuthenticationError(message)
      : response.status === 403
        ? new ForbiddenError(message)
        : new ApolloError(message)

    Object.assign(err.extensions, {
      response: {
        url: response.url,
        status: response.status,
        statusText: response.statusText,
        body
      }
    })

    error(`Request to resource "${endpoint}" resulted in:\n\n${err.stack}\n`)
    return err
  }

  movie = ({ id, ...params }, info) => this.get(
    `movie/${id}`,
    { append_to_response: `credits,images,keywords,videos,external_ids,similar`, ...params },
    this.extractTTL(info)
  )

  movieCredits = ({ id, ...params }, info) => this.get(`movie/${id}/credits`, ...params, this.extractTTL(info))
  similarMovies = ({ id, ...params }, info) => this.get(`movie/${id}/similar`, ...params, this.extractTTL(info))
  movieSocialMedia = ({ id, ...params }, info) => this.get(`movie/${id}/external_ids`, ...params, this.extractTTL(info))
  movieImages = ({ id, ...params }, info) => this.get(`movie/${id}/images`, ...params, this.extractTTL(info))
  movieKeywords = ({ id, ...params }, info) => this.get(`movie/${id}/keywords`, ...params, this.extractTTL(info))
  movieVideos = ({ id, ...params }, info) => this.get(`movie/${id}/videos`, ...params, this.extractTTL(info))

  person = ({ id, ...params }, info) => this.get(
    `person/${id}`,
    { append_to_response: `combined_credits,images,external_ids`, ...params },
    this.extractTTL(info)
  )

  personCredits = ({ id, ...params }, info) => this.get(`person/${id}/combined_credits`, ...params, this.extractTTL(info))
  personSocialMedia = ({ id, ...params }, info) => this.get(`person/${id}/external_ids`, ...params, this.extractTTL(info))
  personImages = ({ id, ...params }, info) => this.get(`person/${id}/images`, ...params, this.extractTTL(info))

  network = ({ id, ...params }, info) => this.get(`network/${id}`, ...params, this.extractTTL(info))
  networkImages = ({ id, ...params }, info) => this.get(`network/${id}/images`, ...params, this.extractTTL(info))

  company = ({ id, ...params }, info) => this.get(`company/${id}`, ...params, this.extractTTL(info))
  companyImages = ({ id, ...params }, info) => this.get(`company/${id}/images`, ...params, this.extractTTL(info))

  tv = ({ id, ...params }, info) => this.get(
    `tv/${id}`,
    { append_to_response: `credits,images,keywords,videos,external_ids,recommendations,similar`, ...params },
    this.extractTTL(info)
  )

  tvCredits = ({ id, ...params }, info) => this.get(`tv/${id}/credits`, ...params, this.extractTTL(info))
  similarShows = ({ id, ...params }, info) => this.get(`tv/${id}/similar`, ...params, this.extractTTL(info))
  tvSocialMedia = ({ id, ...params }, info) => this.get(`tv/${id}/external_ids`, ...params, this.extractTTL(info))
  tvImages = ({ id, ...params }, info) => this.get(`tv/${id}/images`, ...params, this.extractTTL(info))
  tvKeywords = ({ id, ...params }, info) => this.get(`tv/${id}/keywords`, ...params, this.extractTTL(info))
  tvVideos = ({ id, ...params }, info) => this.get(`tv/${id}/videos`, ...params, this.extractTTL(info))

  season = ({ show, season, ...params }, info) =>
    this.get(`tv/${show}/season/${season}`, ...params, this.extractTTL(info))

  seasonCredits = ({ show, season, ...params }, info) =>
    this.get(`tv/${show}/season/${season}/credits`, ...params, this.extractTTL(info))

  seasonImages = ({ show, season, ...params }, info) =>
    this.get(`tv/${show}/season/${season}/images`, ...params, this.extractTTL(info))

  seasonVideos = ({ show, season, ...params }, info) =>
    this.get(`tv/${show}/season/${season}/videos`, ...params, this.extractTTL(info))

  episode = ({ show, season, episode, ...params }, info) =>
    this.get(`tv/${show}/season/${season}/episode/${episode}`, ...params, this.extractTTL(info))

  episodeCredits = ({ show, season, episode, ...params }, info) =>
    this.get(`tv/${show}/season/${season}/episode/${episode}/credits`, ...params, this.extractTTL(info))

  episodeImages = ({ show, season, episode, ...params }, info) =>
    this.get(`tv/${show}/season/${season}/episode/${episode}/images`, ...params, this.extractTTL(info))

  episodeVideos = ({ show, season, episode, ...params }, info) =>
    this.get(`tv/${show}/season/${season}/episode/${episode}/videos`, ...params, this.extractTTL(info))

  search = (params = {}, info) => {
    params |> logObj
    return this.get(`search/multi`, { ...params }, this.extractTTL(info))
  }

  searchMovies = (params = {}, info) => this.get(`search/movie`, { ...params }, this.extractTTL(info))
  searchTVShows = (params = {}, info) => this.get(`search/tv`, { ...params }, this.extractTTL(info))
  searchPeople = (params = {}, info) => this.get(`search/person`, { ...params }, this.extractTTL(info))

  popularMovies = (params = {}, info) => this.get(`movie/popular`, { ...params }, this.extractTTL(info))
  popularPeople = (params = {}, info) => this.get(`person/popular`, { ...params }, this.extractTTL(info))
  popularTV = (params = {}, info) => this.get(`tv/popular`, { ...params }, this.extractTTL(info))

  nowPlaying = (params = {}, info) => this.get(`movie/now_playing`, { ...params }, this.extractTTL(info))
  topRatedMovies = (params = {}, info) => this.get(`movie/top_rated`, { ...params }, this.extractTTL(info))
  upcomingMovies = (params = {}, info) => this.get(`movie/upcoming`, { ...params }, this.extractTTL(info))

  airingThisWeek = (params = {}, info) => this.get(`tv/on_the_air`, { ...params }, this.extractTTL(info))
  airingToday = (params = {}, info) => this.get(`tv/airing_today`, { ...params }, this.extractTTL(info))
  topRatedTV = (params = {}, info) => this.get(`tv/top_rated`, { ...params }, this.extractTTL(info))
}
