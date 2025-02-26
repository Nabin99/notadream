import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";

import type { APIConfig } from "./type";

export let apiConfigProperty: Readonly<APIConfig> = {} as APIConfig;

export const configFastifyPlugin = fastifyPlugin(
  (fastify: FastifyInstance, options: { apiConfig: APIConfig }, done) => {
    fastify.decorate("apiConfig", options.apiConfig);
    apiConfigProperty = { ...options.apiConfig };

    done();
  }
);

declare module "fastify" {
  interface FastifyInstance {
    apiConfig: APIConfig;
  }
}
