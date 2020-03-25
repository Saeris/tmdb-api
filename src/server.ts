import { ApolloServer } from "apollo-server-lambda"
import { APIGatewayEvent, Context as LambdaContext } from "aws-lambda"
import { schema } from "./schema"
import { dataSources } from "./sources"
import { playground } from "./playground"

export interface Context {
  headers: APIGatewayEvent["headers"]
  functionName: LambdaContext["functionName"]
  event: APIGatewayEvent
  context: LambdaContext
}

const isDev = process.env.stage === `dev` || !!process.env.OFFLINE
export const server = new ApolloServer({
  schema,
  context: ({
    event,
    context
  }: {
    event: APIGatewayEvent
    context: LambdaContext
  }): Context => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  }),
  dataSources,
  tracing: true,
  formatError: (err: Error) => {
    // eslint-disable-next-line no-console
    console.error(err)
    return err
  },
  introspection: isDev,
  playground: isDev ? playground : false
})
