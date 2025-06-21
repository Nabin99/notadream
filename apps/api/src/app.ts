import cors from "@fastify/cors";
import {
  AuthPlugin,
  AuthRoutePlugin,
  configFastifyPlugin,
  errorHandler,
  mongoDBPlugin,
  NoSQLDatabaseConfig,
} from "@notadream/fastify";
import fastify from "fastify";

import { config } from "./config/config";
import { loginSchema } from "./model";
import { UserService } from "./service";

const app = async () => {
  const fastifyApp = await fastify({
    logger: {
      level: "info",
    },
  });

  await fastifyApp.register(configFastifyPlugin, { apiConfig: config });
  await fastifyApp.register(cors, config.cors);
  await fastifyApp.register(mongoDBPlugin);
  await fastifyApp.register(AuthPlugin);

  // Global error handler
  fastifyApp.setErrorHandler(errorHandler);

  fastifyApp.get("/", {}, async (_, reply) => {
    const apiConfig = fastifyApp.apiConfig;

    const appInfo = {
      appName: apiConfig.appName,
      baseUrl: apiConfig.baseUrl,
      environment: apiConfig.environment,
      port: apiConfig.port,
    };

    reply.send(appInfo);
  });

  fastifyApp.register(AuthRoutePlugin, {
    userService: new UserService(
      fastifyApp.mongodb[
        (fastifyApp.apiConfig.database.nosql?.[0] as NoSQLDatabaseConfig).name
      ].db
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) as any,
    loginSchema: loginSchema,
    cookieOptions: fastifyApp.apiConfig.auth.cookieOptions,
    routes: fastifyApp.apiConfig.auth.routes,
  });

  //authorized routes
  // users routes
  // employee routes
  // shipments routes
  // and other different routes
  //non authorized routes
  // any routes that do not required authentications

  return fastifyApp;
};

export default app;
