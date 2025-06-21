import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

export const userRoute = fp(async (fastify: FastifyInstance) => {
  fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    request;
    reply;
  });
});
