export { cast, crew, similar, videos } from "./shared";

export const status = (parent: Record<string, string>) =>
  parent.status.replace(/\s/g, ``);

export const score = (parent: Record<string, string>) => parent.vote_average;

export const votes = (parent: Record<string, string>) => parent.vote_count;

export const languages = (parent: Record<string, string>) =>
  parent.spoken_languages;

export const releaseDate = (parent: Record<string, string>) =>
  parent.release_date;

export const backdrop = (parent: Record<string, string>) =>
  parent.backdrop_path;

export const poster = (parent: Record<string, string>) => parent.poster_path;
