import { buildDateRange, DateRange } from "./buildDateRange"
import { buildNumberRange, NumberRange } from "./buildNumberRange"
import { buildKeywordFilter, KeywordInput } from "./buildKeywordFilter"
import { buildStringFilter, StringFilter } from "./buildStringFilter"
import { removeEmpty } from "../../utils"

export interface DiscoverTVFilter {
  airDate?: DateRange
  firstAired?: DateRange
  firstAiredYear?: number
  includeUnaired?: boolean
  screenedTheatrically?: boolean
  timeZone?: string
  voteAverage?: NumberRange
  voteCount?: NumberRange
  withCompanies?: StringFilter
  withGenres?: StringFilter
  withNetworks?: StringFilter
  withRuntime?: NumberRange
  withOriginalLanguage?: string
  withKeywords?: KeywordInput
}

export const buildTVFilter = ({
	airDate,
	firstAired,
	firstAiredYear,
	timeZone,
	voteAverage,
	voteCount,
	includeUnaired,
	screenedTheatrically,
	withCompanies,
	withGenres,
	withNetworks,
	withRuntime,
	withOriginalLanguage,
	withKeywords
}: DiscoverTVFilter) => removeEmpty({
	...buildDateRange(`air_date`, airDate),
	...buildDateRange(`first_air_date`, firstAired),
	first_air_date_year: firstAiredYear,
	timeZone,
  ...buildNumberRange(`vote_count`, voteCount),
  ...buildNumberRange(`vote_average`, voteAverage),
  ...buildStringFilter(`genres`, withGenres),
  ...buildStringFilter(`networks`, withNetworks),
  ...buildNumberRange(`with_runtime`, withRuntime),
	include_null_first_air_dates: includeUnaired,
  with_original_language: withOriginalLanguage,
  ...buildKeywordFilter(`keywords`, withKeywords),
  ...buildStringFilter(`companies`, withCompanies),
	screened_theatrically: screenedTheatrically
})
