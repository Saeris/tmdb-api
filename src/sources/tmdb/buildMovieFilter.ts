import type { DateRange } from "./buildDateRange"
import { buildDateRange } from "./buildDateRange"
import type { KeywordInput } from "./buildKeywordFilter"
import { buildKeywordFilter } from "./buildKeywordFilter"
import type { NumberRange } from "./buildNumberRange"
import { buildNumberRange } from "./buildNumberRange"
import type { ReleaseType } from "./buildReleaseType"
import { buildReleaseType } from "./buildReleaseType"
import type { StringFilter } from "./buildStringFilter"
import { buildStringFilter } from "./buildStringFilter"
import { removeEmpty } from "../../utils"

export interface DiscoverMoviesFilter {
  region?: string
  includeAdult?: boolean
  includeVideo?: boolean
  primaryReleaseYear?: number
  primaryReleaseDate?: DateRange
  releaseDate?: DateRange
  withReleaseType?: ReleaseType
  year?: number
  voteCount?: NumberRange
  voteAverage?: NumberRange
  withCast?: StringFilter
  withCrew?: StringFilter
  withPeople?: StringFilter
  withCompanies?: StringFilter
  withGenres?: StringFilter
  withKeywords?: KeywordInput
  withRuntime?: NumberRange
  withOriginalLanguage?: string
}

export const buildMovieFilter = ({
  region,
  includeAdult,
  includeVideo,
  primaryReleaseYear,
  primaryReleaseDate,
  releaseDate,
  withReleaseType,
  year,
  voteCount,
  voteAverage,
  withCast,
  withCrew,
  withPeople,
  withCompanies,
  withGenres,
  withKeywords,
  withRuntime,
  withOriginalLanguage
}: DiscoverMoviesFilter) =>
  removeEmpty({
    region,
    include_adult: includeAdult,
    include_video: includeVideo,
    primary_release_year: primaryReleaseYear,
    ...buildDateRange(`primary_release_date`, primaryReleaseDate),
    ...buildDateRange(`release_date`, releaseDate),
    ...buildReleaseType(`with_release_type`, withReleaseType),
    year,
    ...buildNumberRange(`vote_count`, voteCount),
    ...buildNumberRange(`vote_average`, voteAverage),
    ...buildStringFilter(`cast`, withCast),
    ...buildStringFilter(`crew`, withCrew),
    ...buildStringFilter(`peope`, withPeople),
    ...buildStringFilter(`companies`, withCompanies),
    ...buildStringFilter(`genres`, withGenres),
    ...buildKeywordFilter(`keywords`, withKeywords),
    ...buildNumberRange(`with_runtime`, withRuntime),
    with_original_language: withOriginalLanguage
  })
