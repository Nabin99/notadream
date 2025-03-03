/**
 * Fastify Plugin for MongoDB
 */
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

import MongoDBConnection from "./mongodb-connection";

import type { Db, MongoClient } from "mongodb";

declare module "fastify" {
  interface FastifyInstance {
    mongodb: MongoDBInstanceType;
  }
}

interface MongoDBInstanceType {
  [k: string]: {
    db: Db;
    client: MongoClient;
  };
}

async function fastifyMongoDB(fastify: FastifyInstance) {
  const mongodbConnecitonLists = fastify.apiConfig.database.nosql || [];

  const dbInstances = {} as MongoDBInstanceType;

  for (const mongodbConnectionConfig of mongodbConnecitonLists) {
    const mongoConnection = MongoDBConnection.getInstance(
      fastify,
      mongodbConnectionConfig
    );

    await mongoConnection.connect();

    dbInstances[mongodbConnectionConfig.name] = {
      db: mongoConnection.getDatabase(),
      client: mongoConnection.getClient(),
    };

    fastify.addHook("onClose", async () => {
      await mongoConnection.disconnect();
    });
  }

  fastify.decorate("mongodb", dbInstances);
}

export const mongoDBPlugin = fp(fastifyMongoDB, {
  name: "fastify-mongodb-plugin",
  fastify: "5.x",
});
