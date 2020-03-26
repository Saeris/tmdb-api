import { server } from "../src";

export const handler = server.createHandler({
  cors: {
    // Set to '*' to allow any origin
    origin: true,
    credentials: true
  }
});
