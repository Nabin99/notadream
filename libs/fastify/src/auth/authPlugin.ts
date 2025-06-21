import fastifyJwt from "@fastify/jwt";
import { FastifyInstance, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

import { ForbiddenError, UnauthorizedError } from "../apiResponseFormat";

export const AuthPlugin = fp(
  async (fastify: FastifyInstance) => {
    const config = fastify.apiConfig;

    fastify.register(fastifyJwt, {
      secret: config.auth.jwtSecret,
    });

    fastify.decorate("authenticate", async (request: FastifyRequest) => {
      try {
        await request.jwtVerify();
      } catch {
        // reply.code(401).send({ error: "Unauthorized" });
        throw new UnauthorizedError("User not authorized");
      }
    });

    fastify.decorate("authorize", (roles: string[]) => {
      return async (request: FastifyRequest) => {
        const user = request.user as { role: string };

        if (!user || !roles.includes(user.role)) {
          // reply.code(403).send({ error: "Forbidden" });
          throw new ForbiddenError("User not authorized");
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

    // fastify.post(
    //   "/refresh",
    //   async (request: FastifyRequest, reply: FastifyReply) => {
    //     const { refreshToken } = request.body as { refreshToken: string };

    //     try {
    //       const payload = authService.verifyRefreshToken(refreshToken);
    //       const newToken = authService.generateToken({
    //         id: payload.id,
    //         role: payload.role,
    //       });

    //       reply.send({ token: newToken });
    //     } catch {
    //       // reply.code(401).send({ error: "Invalid refresh token" });
    //       throw new UnauthorizedError("Invalid refresh token");
    //     }
    //   }
    // );

    // fastify.post(
    //   "/logout",
    //   async (request: FastifyRequest, reply: FastifyReply) => {
    //     const { token } = request.body as { token: string };
    //     authService.revokeToken(token);

    //     reply.send({ message: "Logged out successfully" });
    //   }
    // );
  },
  {
    name: "authPlugin",
    fastify: "5.x",
  }
);

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest) => Promise<void>;
    authorize: (roles: string[]) => (request: FastifyRequest) => Promise<void>;
  }
}
