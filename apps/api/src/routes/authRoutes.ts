import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

import { USER_ROLE_ENUM } from "../constant";

export const userAuthRoutes = fp(async (fastify: FastifyInstance) => {
  const authHandler = [
    fastify.authenticate,
    fastify.authorize([USER_ROLE_ENUM.USER]),
  ];

  fastify.get(
    "/users",
    {
      preHandler: authHandler,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      reply.send("It should not be send.");
    }
  );
});
