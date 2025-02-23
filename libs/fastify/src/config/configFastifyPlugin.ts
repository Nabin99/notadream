import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";

import type { APIConfig } from "./type";

export const configFastifyPlugin = fastifyPlugin(
  (fastify: FastifyInstance, apiConfig: APIConfig, done) => {
    fastify.decorate("apiConfig", apiConfig);
    done();
  }
);
