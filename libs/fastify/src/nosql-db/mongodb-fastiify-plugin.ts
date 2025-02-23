/**
 * Fastify Plugin for MongoDB
 */
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

import { APIConfig } from "../config";
import MongoDBConnection from "./mongodb-connection";

async function fastifyMongoDB(
  fastify: FastifyInstance,
  options: { config: APIConfig }
) {
  const mongodbConnecitonLists = options.config.database.nosql || [];

  for (const mongodbConnectionConfig of mongodbConnecitonLists) {
    const mongoConnection = MongoDBConnection.getInstance(
      mongodbConnectionConfig
    );

    await mongoConnection.connect();

    fastify.decorate(`mongodb-${mongodbConnectionConfig.name}`, {
      db: mongoConnection.getDatabase(),
      client: mongoConnection.getClient(),
    });

    fastify.addHook("onClose", async () => {
      await mongoConnection.disconnect();
    });
  }
}

export const mongoDBPlugin = fp(fastifyMongoDB, {
  name: "fastify-mongodb",
});
