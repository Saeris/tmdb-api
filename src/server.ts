import type { APIGatewayEvent, Context as LambdaContext } from "aws-lambda"
import type { Logger } from "apollo-server-types"
import type { Config } from "apollo-server-lambda"
import { ApolloServer } from "apollo-server-lambda"
import {
  ApolloServerPluginSchemaReporting as schemaReportingPlugin,
  ApolloServerPluginUsageReporting as usageReportingPlugin
} from "apollo-server-core"
import { models } from "./models"
import { schema } from "./schema"
import { dataSources } from "./sources"
import { playground } from "./playground"
import { setupReporting } from "./reporting"

export interface Context {
  headers: APIGatewayEvent["headers"]
  functionName: LambdaContext["functionName"]
  event: APIGatewayEvent
  context: LambdaContext
  language?: string
  models: typeof models
  v4apiKey?: string
  v3apiKey?: string
  logger: Logger
}

const logger = setupReporting({ level: `debug` })

export const lambdaContext = ({
  event,
  context
}: {
  event: APIGatewayEvent
  context: LambdaContext
}): Context => ({
  headers: event.headers,
  functionName: context.functionName,
  event,
  context,
  logger,
  models
})

export const serverConfig: Config = {
  schema,
  logger,
  dataSources,
  introspection: true,
  tracing: true,
  cacheControl: true,
  apollo: {
    key: process.env.APOLLO_KEY,
    graphVariant: process.env.APOLLO_GRAPH_VARIANT
  },
  plugins: [
    ...(process.env.APOLLO_KEY
      ? [
          schemaReportingPlugin(),
          usageReportingPlugin({
            includeRequest: async () =>
              new Promise<boolean>((resolve) => resolve(true)), // eslint-disable-line
            sendReportsImmediately: true
          })
        ]
      : [])
  ],
  playground
}

export const lambdaServer = new ApolloServer({
  ...serverConfig,
  context: lambdaContext
})
