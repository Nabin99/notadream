import {
  AuthPlugin,
  configFastifyPlugin,
  errorHandler,
  mongoDBPlugin,
} from "@notadream/fastify";
import fastify from "fastify";

import { config } from "./config/config";

const app = async () => {
  const fastifyApp = await fastify({
    logger: {
      level: "info",
    },
  });

  fastifyApp.register(configFastifyPlugin, { apiConfig: config });
  fastifyApp.register(mongoDBPlugin);
  fastifyApp.register(AuthPlugin);

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
