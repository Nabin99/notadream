import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";

import type { APIConfig } from "./type";

export const configFastifyPlugin = fastifyPlugin(
  (fastify: FastifyInstance, options: { apiConfig: APIConfig }, done) => {
    fastify.decorate("apiConfig", options.apiConfig);

    done();
  },
  {
    name: "configFastifyPlugin",
    fastify: "5.x",
  }
);

declare module "fastify" {
  interface FastifyInstance {
    apiConfig: APIConfig;
  }
}
