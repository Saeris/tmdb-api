# API Coverage

## Account

**GET** (0/9)

- [ ] Get Details `/account`
	- [ ] `session_id`!
- [ ] Get Created Lists `/account/${account_id}/lists`
	- [ ] `session_id`!
	- [ ] `language`
	- [ ] `page`
- [ ] Get Favorite Movies `/account/${account_id}/favorite/movies`
	- [ ] `session_id`!
	- [ ] `language`
	- [ ] `sort_by` (`created_at.asc` | `created_at.desc`)
	- [ ] `page`
- [ ] Get Favorite TV Shows `/account/${account_id}/favorite/tv`
	- [ ] `session_id`!
	- [ ] `language`
	- [ ] `sort_by` (`created_at.asc` | `created_at.desc`)
	- [ ] `page`
- [ ] Get Rated Movies `/account/${account_id}/rated/movies`
	- [ ] `session_id`!
	- [ ] `language`
	- [ ] `sort_by` (`created_at.asc` | `created_at.desc`)
	- [ ] `page`
- [ ] Get Rated TV Shows `/account/${account_id}/rated/tv`
	- [ ] `session_id`!
	- [ ] `language`
	- [ ] `sort_by` (`created_at.asc` | `created_at.desc`)
	- [ ] `page`
- [ ] Get Rated TV Episodes `/account/${account_id}/rated/tv/episodes`
	- [ ] `session_id`!
	- [ ] `language`
	- [ ] `sort_by` (`created_at.asc` | `created_at.desc`)
	- [ ] `page`
- [ ] Get Movie Watchlist `/account/${account_id}/watchlist/movies`
	- [ ] `session_id`!
	- [ ] `language`
	- [ ] `sort_by` (`created_at.asc` | `created_at.desc`)
	- [ ] `page`
- [ ] Get TV Show Watchlist `/account/${account_id}/watchlist/tv`
	- [ ] `session_id`!
	- [ ] `language`
	- [ ] `sort_by` (`created_at.asc` | `created_at.desc`)
	- [ ] `page`

**POST** (0/2)

- [ ] Mark as Favorite `/account/${account_id}/favorite`
	- [ ] `session_id`!
- [ ] Add to Watchlist `/account/${account_id}/watchlist`
	- [ ] `session_id`!

## Authentication

**GET** (0/2)

- [ ] Create Guest Session `/authentication/guest_session/new`
- [ ] Create Request Token `/authentication/token/new`

**POST** (0/3)

- [ ] Create Session `/authentication/session/new`
- [ ] Create Session with Login `/authentication/token/validate_with_login`
- [ ] Create Session from 4v Token `/authentication/session/convert/4`

**DELETE** (0/1)

- [ ] Delete Session `/authentication/session`

## Certification

**GET** (0/2)

- [ ] Get Movie Certifications `/certification/movie/list`
- [ ] Get TV Certifications `/certification/tv/list`

## Changes

**GET** (0/3)

- [ ] Get Movie Change List `/movie/changes`
	- [ ] `start_date`
	- [ ] `end_date`
	- [ ] `page`
- [ ] Get TV Change List `/tv/changes`
	- [ ] `start_date`
	- [ ] `end_date`
	- [ ] `page`
- [ ] Get Person Change List `/person/changes`
	- [ ] `start_date`
	- [ ] `end_date`
	- [ ] `page`

## Collections

**GET** (0/3)

- [X] Get Details `/collection/${collection_id}`
	- [ ] `language`
- [ ] Get Images `/collection/${collection_id}/images`
	- [ ] `language`
- [ ] Get Translations `/collection/${collection_id}/translations`
	- [ ] `language`

## Companies

**GET** (1/3)

- [X] Get Details `/company/${company_id}`
- [ ] Get Alternate Names `/company/${company_id}/alternative_names`
- [ ] Get Images `/company/${company_id}/images`

## Configuration

**GET** (4/6)

- [ ] Get API Configuration `/configuration`
- [X] Get Countries `/configuration/countries`
- [X] Get Jobs `/configuration/jobs`
- [X] Get Languages `/configuration/languages`
- [ ] Get Primary Translations `/configuration/primary_translations`
- [X] Get Timezones `/configuration/timezones`

## Credits

**GET** (0/1)

- [ ] Get Details `/credit/${credit_id}`

## Discover

**GET** (2/2)

- [X] Movie Discover `/discover/movie`
- [X] TV Discover `/discover/tv`

## Find

**GET** (0/1)

- [ ] Find by ID `/find/${external_id}`
	- [ ] `language`
	- [ ] `external_source`

## Genres

**GET** (2/2)

- [X] Get Movie List `/genre/movie/list`
	- [X] `language`
- [X] Get TV List `/genre/tv/list`
	- [X] `language`

## Guest Sessions

**GET** (0/3)

- [ ] Get Rated Movies `/guest_session/${guest_session_id}/rated/movies`
	- [ ] `language`
	- [ ] `sort_by` (`created_at.asc` | `created_at.desc`)
- [ ] Get Rated TV Shows `/guest_session/${guest_session_id}/rated/tv`
	- [ ] `language`
	- [ ] `sort_by` (`created_at.asc` | `created_at.desc`)
- [ ] Get Rated TV Episodes `/guest_session/${guest_session_id}/rated/tv/episodes`
	- [ ] `language`
	- [ ] `sort_by` (`created_at.asc` | `created_at.desc`)

## Keywords

**GET** (0/2)

- [ ] Get Details `/keyword/${keyword_id}`
- [ ] Get Movies `/keyword/${keyword_id}/movies`
	- [ ] `language`
	- [ ] `include_adult`

## Lists



## Movies

**GET** (/20)

- [ ] Get Details `/movie/${movie_id}`
	- [ ] `language`
	- [ ] `append_to_response` (`account_states` | `alternative_titles` | `changes` | `credits` | `external_ids` | `images` | `keywords` | `release_dates` | `videos` | `translations` | `recommendations` | `similar` | `reviews` | `lists`)
- [ ] Get Account States `/movie/${movie_id}/account_states`
	- [ ] `session_id`!
	- [ ] `guest_session_id`
- [ ] Get Alternative Titles `/movie/${movie_id}/alternative_titles`
	- [ ] `country`
- [ ] Get Changes `/movie/${movie_id}/changes`
	- [ ] `start_date`
	- [ ] `end_date`
	- [ ] `page`
- [ ] Get Credits `/movie/${movie_id}/credits`
- [ ] Get External Ids `/movie/${movie_id}/external_ids`
- [ ] Get Images `/movie/${movie_id}/images`
	- [ ] `language`
	- [ ] `include_image_language`
- [ ] Get Keywords `/movie/${movie_id}/keywords`
- [ ] Get Release Dates `/movie/${movie_id}/release_dates`
- [ ] Get Videos `/movie/${movie_id}/videos`
	- [ ] `language`
- [ ] Get Translations `/movie/${movie_id}/translations`
- [ ] Get Recommendations `/movie/${movie_id}/recommendations`
	- [ ] `language`
	- [ ] `page`
- [ ] Get Similar Movies `/movie/${movie_id}/similar`
	- [ ] `language`
	- [ ] `page`
- [ ] Get Reviews `/movie/${movie_id}/reviews`
	- [ ] `language`
	- [ ] `page`
- [ ] Get Lists `/movie/${movie_id}/lists`
	- [ ] `language`
	- [ ] `page`
- [ ] Get Latest `/movie/latest`
	- [ ] `language`
- [ ] Get Now Playing `/movie/now_playing`
	- [ ] `language`
	- [ ] `region`
	- [ ] `page`
- [ ] Get Popular `/movie/popular`
	- [ ] `language`
	- [ ] `region`
	- [ ] `page`
- [ ] Get Top Rated `/movie/top_rated`
	- [ ] `language`
	- [ ] `region`
	- [ ] `page`
- [ ] Get Upcoming `/movie/upcoming`
	- [ ] `language`
	- [ ] `region`
	- [ ] `page`

**POST** (0/1)

- [ ] Rate Movie `/movie/${movie_id}/rating`
	- [ ] `session_id`
	- [ ] `guest_session_id`

**DELETE** (0/1)

- [ ] Delete Rating `/movie/${movie_id}/rating`
	- [ ] `session_id`!
	- [ ] `guest_session_id`

## Networks

**GET** (1/3)

- [X] Get Details `/network/${network_id}`
- [ ] Get Alternative Names `/network/${network_id}/alternative_names`
- [ ] Get Images `/network/${network_id}/images`

## Trending

**GET** (1/1)

- [ ] Get Trending `/trending/${media_type}/${time_window}`

## People

**GET** (5/11)

- [X] Get Details `/person/${person_id}`
	- [ ] `language`
	- [ ] `append_to_response` (`changes` | `movie_credits` | `tv_credits` | `combined_credits` | `external_ids` | `images` | `tagged_images` | `translations`)
- [ ] Get Changes `/person/${person_id}/changes`
	- [ ] `start_date`
	- [ ] `end_date`
	- [ ] `page`
- [ ] Get Movie Credits `/person/${person_id}/movie_credits`
	- [ ] `language`
- [ ] Get TV Credits `/person/${person_id}/tv_credits`
	- [ ] `language`
- [X] Get Combined Credits `/person/${person_id}/combined_credits`
	- [ ] `language`
- [X] Get External IDs `/person/${person_id}/external_ids`
	- [ ] `language`
- [X] Get Images `/person/${person_id}/images`
- [ ] Get Tagged Images `/person/${person_id}/tagged_images`
	- [ ] `language`
	- [ ] `page`
- [ ] Get Translations `/person/${person_id}/translations`
	- [ ] `language`
- [ ] Get Latest `/person/latest`
	- [ ] `language`
- [X] Get Popular `/person/popular`
	- [ ] `language`
	- [ ] `page`

## Reviews

**GET** (1/1)

- [X] Get Details `/review/${review_id}`

## Search

**GET** (4/7)

- [ ] Search Companies `/search/company`
	- [ ] `query`
	- [ ] `page`
- [ ] Search Collections `/search/collection`
	- [ ] `query`
	- [ ] `language`
	- [ ] `page`
- [ ] Search Keywords `/search/keyword`
	- [ ] `query`
	- [ ] `page`
- [X] Search Movies `/search/movie`
	- [ ] `query`
	- [ ] `language`
	- [ ] `region`
	- [ ] `year`
	- [ ] `primary_release_year`
	- [ ] `include_adult`
	- [ ] `page`
- [X] Multi Search `/search/multi`
	- [ ] `query`
	- [ ] `language`
	- [ ] `region`
	- [ ] `include_adult`
	- [ ] `page`
- [X] Search People `/search/person`
	- [ ] `query`
	- [ ] `language`
	- [ ] `region`
	- [ ] `include_adult`
	- [ ] `page`
- [X] Search TV Shows `/search/tv`
	- [ ] `query`
	- [ ] `language`
	- [ ] `region`
	- [ ] `first_air_date_year`
	- [ ] `include_adult`
	- [ ] `page`

## TV

**GET** (0/21)

- [X] Get Details `/tv/${tv_id}`
	- [ ] `language`
	- [ ] `append_to_response` (`account_states` | `alternative_titles` | `changes` | `content_ratings` | `credits` | `episode_groups` | `external_ids` | `images` | `keywords` | `recommendations` | `reviews` | `screened_theatrically` | `similar` | `translations` | `videos`)
- [ ] Get Account States `/tv/${tv_id}/account_states`
	- [ ] `session_id`
	- [ ] `guest_session_id`
	- [ ] `language`
- [ ] Get Alternative Titles `/tv/${tv_id}/alternative_titles`
	- [ ] `language`
- [ ] Get Changes `/tv/${tv_id}/changes`
	- [ ] `start_date`
	- [ ] `end_date`
	- [ ] `page`
- [ ] Get Content Ratings `/tv/${tv_id}/content_ratings`
	- [ ] `language`
- [X] Get Credits `/tv/${tv_id}/credits`
	- [ ] `language`
- [ ] Get Episode Groups `/tv/${tv_id}/episode_groups`
	- [ ] `language`
- [X] Get External IDs `/tv/${tv_id}/external_ids`
	- [ ] `language`
- [X] Get Images `/tv/${tv_id}/images`
	- [ ] `language`
- [X] Get Keywords `/tv/${tv_id}/keywords`
- [ ] Get Recommendations `/tv/${tv_id}/recommendations`
	- [ ] `language`
	- [ ] `page`
- [X] Get Reviews `/tv/${tv_id}/reviews`
	- [ ] `language`
	- [ ] `page`
- [ ] Get Screened Theatrically `/tv/${tv_id}/screened_theatrically`
- [X] Get Similar TV Shows `/tv/${tv_id}/similar`
	- [ ] `language`
	- [ ] `page`
- [ ] Get Translations `/tv/${tv_id}/translations`
- [X] Get Videos `/tv/${tv_id}/videos`
	- [ ] `language`
- [ ] Get Latest `/tv/latest`
	- [ ] `language`
- [X] Get TV Airing Today `/tv/airing_today`
	- [ ] `language`
	- [ ] `page`
- [X] Get TV On The Air `/tv/on_the_air`
	- [ ] `language`
	- [ ] `page`
- [X] Get Popular `/tv/popular`
	- [ ] `language`
	- [ ] `page`
- [X] Get Top Rated `/tv/top_rated`
	- [ ] `language`
	- [ ] `page`

**POST** (0/1)

- [ ] Rate TV Show `/tv/${tv_id}/rating`
	- [ ] `session_id`
	- [ ] `guest_session_id`

**DELETE** (0/1)

- [ ] Delete Rating `/tv/${tv_id}/rating`
	- [ ] `session_id`
	- [ ] `guest_session_id`

## Seasons

**GET** (0/7)

- [ ] Get Details `/tv/${tv_id}/season/${season_number}`
	- [ ] `language`
	- [ ] `append_to_response` (`changes` | `account_states` | `credits` | `external_ids` | `images` | `videos`)
- [ ] Get Changes `/tv/season/${season_id}/changes`
	- [ ] `start_date`
	- [ ] `end_date`
	- [ ] `page`
- [ ] Get Account States `/tv/${tv_id}/season/${season_number}/account_states`
	- [ ] `session_id`
	- [ ] `guest_session_id`
	- [ ] `language`
- [ ] Get Credits `/tv/${tv_id}/season/${season_number}/credits`
	- [ ] `language`
- [ ] Get External IDs `/tv/${tv_id}/season/${season_number}/external_ids`
	- [ ] `language`
- [ ] Get Images `/tv/${tv_id}/season/${season_number}/images`
	- [ ] `language`
- [ ] Get Videos `/tv/${tv_id}/season/${season_number}/videos`
	- [ ] `language`

## Episodes

**GET** (0/8)

- [ ] Get Details `/tv/${tv_id}/season/${season_number}/episode/${episode_number}`
	- [ ] `language`
	- [ ] `append_to_response` (`changes` | `account_states` | `credits` | `external_ids` | `images` | `translations` | `videos`)
- [ ] Get Changes `/tv/episode/${episode_id}/changes`
	- [ ] `start_date`
	- [ ] `end_date`
	- [ ] `page`
- [ ] Get Account States `/tv/${tv_id}/season/${season_number}/episode/${episode_number}/account_states`
	- [ ] `session_id`
	- [ ] `guest_session_id`
- [ ] Get Credits `/tv/${tv_id}/season/${season_number}/episode/${episode_number}/credits`
- [ ] Get External IDs `/tv/${tv_id}/season/${season_number}/episode/${episode_number}/external_ids`
- [ ] Get Images `/tv/${tv_id}/season/${season_number}/episode/${episode_number}/images`
- [ ] Get Translations `/tv/${tv_id}/season/${season_number}/episode/${episode_number}/translations`
- [ ] Get Videos `/tv/${tv_id}/season/${season_number}/episode/${episode_number}/videos`
	- [ ] `language`

**POST** (0/1)

- [ ] Rate TV Episode `/tv/${tv_id}/season/${season_number}/episode/${episode_number}/rating`
	- [ ] `session_id`
	- [ ] `guest_session_id`

**DELETE** (0/1)

- [ ] Delete Rating `/tv/${tv_id}/season/${season_number}/episode/${episode_number}/rating`
	- [ ] `session_id`
	- [ ] `guest_session_id`

## Episode Groups

**GET** (0/1)

- [ ] Get Details `/tv/episode_group/${id}`
	- [ ] `language`
