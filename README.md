<h1 align="center" style="display: block; text-align: center;">🎬 TMDB API</h1>
<p align="center"><a href="https://travis-ci.com/Saeris/tmdb-api"><img src="https://travis-ci.com/Saeris/tmdb-api.svg?branch=master" alt="Build Status" /></a><a href="https://codecov.io/gh/Saeris/tmdb-api"><img src="https://codecov.io/gh/Saeris/tmdb-api/branch/master/graph/badge.svg" alt="Code Coverage"/></a></p>
<p align="center">A GraphQL API wrapper for The Movie DB built with <a href="https://www.apollographql.com/docs/apollo-server/features/data-sources.html">Apollo Data Sources</a>.</p>

## 🛠️ Setup

Install dependencies by running `yarn`, then create a new file in the root directory named `.env`. You'll need to get an API key from The Movie DB in order to run any queries. For more information, please read the [Movie DB docs](https://developers.themoviedb.org/3/getting-started/introduction). Additionally, if you want to track usage metrics for your API, you'll need to get an API key from Apollo Graph Manager. For instructions on how to do that, please read the [Apollo Graph Manager docs](https://www.apollographql.com/docs/graph-manager/). In your new `.env` file, copy + paste the following and replace the text following the `=` sign with your newly create API keys.

```
MOVIE_DB_API_V3_KEY=<insert your movie database v3 api key here>
# OR
MOVIE_DB_API_V4_KEY=<insert your movie database v4 api key here>

APOLLO_KEY=<insert your apollo studio api key here>
```

Once that's done, you can now start up a development server using `yarn start`. Once the development server is listening, you can pull up a GraphQL Playground by visiting one of the following URL:

Netlify: http://localhost:1337/.netlify/functions/tmdb-api

## 🕹️ Demo

You can try out the API using the GraphQL Playground hosted at https://tmdb-api.saeris.io/.netlify/functions/tmdb-api

## 🧪 Testing

Testing is provided via `jest` and is pre-configured to run with `codecov` as well. While tests for this project are far from complete, they can be found under `src/__TEST__` and follow a naming format of `[filename].spec.ts`. Additionally, this project uses `eslint`, `typescript`, and `prettier`, all three of which are automatically run on each commit via `husky` + `lint-staged`. To manually lint and test, use the following commands:

Lint:

```bash
yarn lint
```

Typecheck:

```bash
yarn typecheck
```

Test and watch for changes:

```bash
yarn test:watch
```

Lint + Typecheck + Test:

```bash
yarn test
```

## 🥂 License

Released under the [MIT license](https://github.com/Saeris/tmdb-api/blob/master/LICENSE.md).
