import { ApolloServer } from "apollo-server-lambda"
import Raven from "raven"
import RavenLambdaWrapper from "serverless-sentry-lib"
import { RedisCache } from "apollo-server-cache-redis"
import schema from "./schema"
import dataSources from "./sources"
import "./logger"

const isLocalEnv = process.env.IS_OFFLINE || process.env.IS_LOCAL || !process.env.LAMBDA_TASK_ROOT

const cache = new RedisCache({
  host: isLocalEnv ? `localhost` : process.env.REDIS_HOST,
  port: isLocalEnv ? 6379 : process.env.REDIS_PORT
})

const server = new ApolloServer({
  schema,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  }),
  dataSources,
  tracing: true,
  cacheControl: true,
  persistedQueries: { cache },
  cache,
  engine: false,
  debug: false
})

exports.graphqlHandler = RavenLambdaWrapper.handler(Raven, (event, context, callback) => { // eslint-disable-line
  Raven.disableConsoleAlerts()

  const handler = server.createHandler({
    cors: {
      origin: `*`,
      credentials: true
    }
  })

  handler(event, context, callback)
})
