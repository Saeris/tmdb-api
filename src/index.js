import { ApolloServer } from "apollo-server-lambda"
import Raven from "raven"
import RavenLambdaWrapper from "serverless-sentry-lib"
import { RedisCache } from "apollo-server-cache-redis"
import { error } from "winston"
import schema from "./schema"
import dataSources from "./sources"
import "./logger"

const isLocalEnv = process.env.IS_OFFLINE || process.env.IS_LOCAL || !process.env.LAMBDA_TASK_ROOT
const host = isLocalEnv ? `localhost` : process.env.REDIS_HOST
const port = isLocalEnv ? 6379 : process.env.REDIS_PORT

let server
let cache

const createServer = endpoint => {
  if (!server) {
    try {
      //debug(`Setting up Apollo Server...`)
      /*
      cache = new RedisCache({
        host,
        port,
        no_ready_check: true
      })
      */

      server = new ApolloServer({
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
        //...(cache ? { persistedQueries: { cache }, cache } : {}),
        engine: false,
        debug: true,
        formatError: err => {
          error(err)
          return err
        },
        introspection: process.env.stage === `dev`,
        playground: process.env.stage === `dev` ? { endpoint } : false
      })
    } catch (err) {
      error(`Failed to create a new Apollo Server!`, err.stack)
    }

    return server
  }

  return server
}

exports.graphqlHandler = RavenLambdaWrapper.handler(Raven, (event, context, callback) => { // eslint-disable-line
  Raven.disableConsoleAlerts()
  context.callbackWaitsForEmptyEventLoop = false

  const handler = createServer(event.headers.Referer).createHandler({
    cors: {
      origin: `*`,
      credentials: true
    }
  })
  //debug(`Server ready! Handling request.`)
  handler(event, context, callback)
})
