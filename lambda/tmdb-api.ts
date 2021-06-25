import type { Handler } from "aws-lambda"
import { lambdaServer } from "../src"

export const handler: Handler = lambdaServer.createHandler({
  cors: {
    // Set to '*' to allow any origin
    origin: true,
    credentials: true
  }
})
