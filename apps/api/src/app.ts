import {
  AuthPlugin,
  configFastifyPlugin,
  errorHandler,
  // mongoDBPlugin,
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
  // fastifyApp.register(mongoDBPlugin, { config: fastifyApp.apiConfig });
  fastifyApp.register(AuthPlugin, { config: fastifyApp.apiConfig });

  // Global error handler
  fastifyApp.setErrorHandler(errorHandler);

  fastifyApp.get("/", {}, async (request, reply) => {
    reply.send({ ...fastifyApp.apiConfig });
  });

  return fastifyApp;
};

export default app;
