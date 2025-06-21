import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

import { InternalServerError, UnauthorizedError } from "../apiResponseFormat";
import { successResponse } from "../apiResponseFormat/successResponse";
import { AuthService } from "../auth";
import { BaseService } from "../nosql-db/base-service";

import type { AuthCookieOptions, AuthRoutes } from "../config";
import type { ZodSchema } from "zod";

// Define interfaces for better type safety and reusability
export interface AuthUser {
  id: string | number;
  email: string;
  password: string;
  role: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allow additional properties
}

export interface AuthPluginOptions<T extends AuthUser = AuthUser> {
  userService: BaseService<T>;
  loginSchema: ZodSchema;
  cookieOptions?: AuthCookieOptions;
  routes?: AuthRoutes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responseTransformer?: (user: T) => Partial<T> | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tokenPayloadTransformer?: (userPayload: T) => Partial<T> | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refreshtTokenPayloadTransformer?: (userPayload: T) => Partial<T> | any;
}

export const AuthRoutePlugin = fp(
  async (fastify: FastifyInstance, options: AuthPluginOptions) => {
    // Get apiConfig from fastify instance
    // const apiConfig = fastify.apiConfig;

    // Merge options with defaults
    const config = {
      cookieOptions: {
        secret: "change-me-in-production",
        httpOnly: true,
        secure: true,
        sameSite: "strict" as const,
        path: "/auth",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        ...options.cookieOptions,
      },
      routes: {
        prefix: "/auth",
        login: "/user/login",
        signup: "/user/signup",
        refresh: "/user/refresh",
        logout: "/user/logout",
        disable: [],
        ...options.routes,
      },
    };

    const transformResponse =
      options.responseTransformer ||
      ((user: AuthUser) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const { password, ...safeUser } = user;

        return safeUser;
      });

    const transformTokenPayload =
      options.tokenPayloadTransformer ||
      ((user: AuthUser) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const { password, ...safeUser } = user;

        return safeUser;
      });

    const transformRefreshTokenPayload =
      options.refreshtTokenPayloadTransformer ||
      ((user: AuthUser) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const { id, role } = user;

        return { id, role };
      });

    // Register cookie plugin if not already registered
    if (!fastify.hasPlugin("@fastify/cookie")) {
      await fastify.register(import("@fastify/cookie"), {
        secret: config.cookieOptions.secret,
        hook: "onRequest",
      });
    }

    const authService = new AuthService(fastify.apiConfig);
    const userService = options.userService;
    const schema = options.loginSchema;
    // Build route paths with prefix
    const getRoutePath = (path: string) => `${config.routes.prefix}${path}`;

    // Login route
    if (!config.routes.disable.includes("login")) {
      fastify.post(
        getRoutePath(config.routes.login),
        // {
        //   schema: {
        //     body: {
        //       type: "object",
        //       required: ["username", "password"],
        //       properties: {
        //         username: { type: "string" },
        //         password: { type: "string" },
        //       },
        //     },
        //     response: {
        //       200: {
        //         type: "object",
        //         properties: {
        //           token: { type: "string" },
        //           user: { type: "object" },
        //         },
        //       },
        //       401: {
        //         type: "object",
        //         properties: {
        //           error: { type: "string" },
        //         },
        //       },
        //     },
        //   },
        // },
        async (request: FastifyRequest, reply: FastifyReply) => {
          try {
            // Validate request body
            const body = schema.parse(request.body);
            const { username, password } = body as {
              username: string;
              password: string;
            };

            // Find user
            const user = await userService.findOne({ email: username });

            if (!user) {
              // Use constant time comparison to prevent timing attacks
              await authService.comparePasswords(
                password,
                "$2b$10$dummyhashdummyhashdummyhashdummyhash"
              );

              return new UnauthorizedError("Invalid credentials");
            }

            // Compare passwords
            const passwordValid = await authService.comparePasswords(
              password,
              user.password
            );

            if (!passwordValid) {
              return new UnauthorizedError("Invalid credentials");
            }

            // Generate tokens
            const token = authService.generateToken(
              transformTokenPayload(user)
            );

            const refreshToken = authService.generateRefreshToken(
              transformRefreshTokenPayload(user)
            );

            // Set HTTP-only cookie with refresh token
            reply.setCookie("refreshToken", refreshToken, {
              httpOnly: config.cookieOptions.httpOnly,
              secure: config.cookieOptions.secure,
              sameSite: config.cookieOptions.sameSite,
              path: config.cookieOptions.path,
              maxAge: config.cookieOptions.maxAge,
            });

            // Transform user for response
            const safeUser = transformResponse(user);

            return reply.send(
              successResponse({ token, user: safeUser }, "Login successful")
            );
          } catch {
            return new InternalServerError();
          }
        }
      );
    }

    // Refresh token route
    if (!config.routes.disable.includes("refresh")) {
      fastify.post(
        getRoutePath(config.routes.refresh),
        async (request: FastifyRequest, reply: FastifyReply) => {
          try {
            const refreshToken = request.cookies.refreshToken;

            if (!refreshToken) {
              return new UnauthorizedError("Refresh token missing");
            }

            // Verify refresh token
            const payload = authService.verifyRefreshToken(refreshToken);

            if (!payload) {
              return new UnauthorizedError("Invalid refresh token");
            }

            // Find user by id
            const user = await userService.findById(payload.id);

            if (!user) {
              return new UnauthorizedError("User not found");
            }

            // Generate new access token
            const newToken = authService.generateToken(
              transformTokenPayload(user)
            );

            // Generate new refresh token
            const newRefreshToken = authService.generateRefreshToken(
              transformRefreshTokenPayload(user)
            );

            // Set new refresh token cookie
            reply.setCookie("refreshToken", newRefreshToken, {
              httpOnly: config.cookieOptions.httpOnly,
              secure: config.cookieOptions.secure,
              sameSite: config.cookieOptions.sameSite,
              path: config.cookieOptions.path,
              maxAge: config.cookieOptions.maxAge,
            });

            return reply.send(successResponse({ token: newToken }));
          } catch {
            return new UnauthorizedError();
          }
        }
      );
    }

    // Logout route
    if (!config.routes.disable.includes("logout")) {
      fastify.post(
        getRoutePath(config.routes.logout),
        async (_: FastifyRequest, reply: FastifyReply) => {
          try {
            // Clear refresh token cookie
            reply.clearCookie("refreshToken", {
              path: config.cookieOptions.path,
            });

            return reply.send(
              successResponse({ success: true }, "Logout successful")
            );
          } catch {
            return new InternalServerError();
          }
        }
      );
    }
  },
  {
    name: "authRoutePlugin",
    fastify: "5.x",
  }
);
