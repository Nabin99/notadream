/**
 * MongoDB Connection Handler
 * Provides a highly modular and configurable MongoDB connection architecture
 */

import { MongoClient, Db } from "mongodb";

import { NoSQLDatabaseConfig } from "../config";

import type { FastifyInstance } from "fastify";

class MongoDBConnection {
  private static instance: MongoDBConnection;
  private client: MongoClient;
  private db?: Db;
  private fastify: FastifyInstance;

  private constructor(fastify: FastifyInstance, config: NoSQLDatabaseConfig) {
    const mongoOptions = config.options;
    this.fastify = fastify;

    if (!config?.uri) {
      throw new Error("MongoDB URI is required in the configuration.");
    }

    this.client = new MongoClient(config.uri, {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 5000,
      ...mongoOptions,
    });
  }

  /**
   * Initialize and connect to MongoDB
   */
  public async connect(): Promise<void> {
    try {
      await this.client.connect();

      this.db = this.client.db();
      this.fastify.log.info("MongoDB connected successfully");
    } catch (error) {
      this.fastify.log.error("MongoDB connection error:", error);

      throw error;
    }
  }

  /**
   * Get database instance
   */
  public getDatabase(): Db {
    if (!this.db) {
      throw new Error(
        "Database connection is not established. Call connect() first."
      );
    }

    return this.db;
  }

  /**
   * Get database instance
   */
  public getClient(): MongoClient {
    if (!this.client) {
      throw new Error("Database client not created.");
    }

    return this.client;
  }

  /**
   * Close the MongoDB connection
   */
  public async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();

      this.fastify.log.info("MongoDB connection closed");
    }
  }

  /**
   * Singleton Instance
   */
  public static getInstance(
    fastify: FastifyInstance,
    config: NoSQLDatabaseConfig
  ): MongoDBConnection {
    if (!MongoDBConnection.instance) {
      MongoDBConnection.instance = new MongoDBConnection(fastify, config);
    }

    return MongoDBConnection.instance;
  }
}

export default MongoDBConnection;
