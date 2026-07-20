import type { FastifyInstance } from "fastify";

export default async function helloRoute(app: FastifyInstance) {
  app.get("/hello", async () => {
    return { message: "Hello World from Jeraya Functions!" };
  });
}
