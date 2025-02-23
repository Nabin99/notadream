import fastifyJwt from "@fastify/jwt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

import { APIConfig } from "../config";
import { AuthService } from "./authService";

export const AuthPlugin = fp(
  async (fastify: FastifyInstance, options: { config: APIConfig }) => {
    const { config } = options;
    const authService = new AuthService(config);

    fastify.register(fastifyJwt, {
      secret: config.auth.jwtSecret,
    });

    fastify.decorate(
      "authenticate",
      async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          await request.jwtVerify();
        } catch {
          reply.code(401).send({ error: "Unauthorized" });
        }
      }
    );

    fastify.decorate("authorize", (roles: string[]) => {
      return async (request: FastifyRequest, reply: FastifyReply) => {
        const user = request.user as { role: string };

        if (!user || !roles.includes(user.role)) {
          reply.code(403).send({ error: "Forbidden" });
        }
      };
    });

    // fastify.decorate("checkPermission", (permission: string) => {
    //   return async (request: FastifyRequest, reply: FastifyReply) => {
    //     const user = request.user as { role: string };

    //     if (!user || !authService.hasPermission(user.role, permission)) {
    //       return reply.code(403).send({ error: "Permission denied" });
    //     }
    //   };
    // });

    fastify.post(
      "/refresh",
      async (request: FastifyRequest, reply: FastifyReply) => {
        const { refreshToken } = request.body as { refreshToken: string };

        try {
          const payload = authService.verifyRefreshToken(refreshToken);
          const newToken = authService.generateToken({
            id: payload.id,
            role: payload.role,
          });

          reply.send({ token: newToken });
        } catch {
          reply.code(401).send({ error: "Invalid refresh token" });
        }
      }
    );

    fastify.post(
      "/logout",
      async (request: FastifyRequest, reply: FastifyReply) => {
        const { token } = request.body as { token: string };
        authService.revokeToken(token);

        reply.send({ message: "Logged out successfully" });
      }
    );
  }
);
