import { server } from "../src";

export const handler = server.createHandler({
  cors: {
    origin: `*`,
    credentials: true
  }
});
