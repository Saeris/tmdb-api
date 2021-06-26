import type { DateRange } from "./buildDateRange";
import { buildDateRange } from "./buildDateRange"
import type { NumberRange } from "./buildNumberRange";
import { buildNumberRange } from "./buildNumberRange"
import type { KeywordInput } from "./buildKeywordFilter";
import { buildKeywordFilter } from "./buildKeywordFilter"
import type { StringFilter } from "./buildStringFilter";
import { buildStringFilter } from "./buildStringFilter"
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
