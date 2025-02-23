/**
 * MongoDB Connection Handler
 * Provides a highly modular and configurable MongoDB connection architecture
 */

import { MongoClient, Db } from "mongodb";

import { NoSQLDatabaseConfig } from "../config";

class MongoDBConnection {
  private static instance: MongoDBConnection;
  private client: MongoClient;
  private db?: Db;

  private constructor(config: NoSQLDatabaseConfig) {
    const mongoOptions = config.options;

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
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("MongoDB connection error:", error);
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
      console.log("MongoDB connection closed");
    }
  }

  /**
   * Singleton Instance
   */
  public static getInstance(config: NoSQLDatabaseConfig): MongoDBConnection {
    if (!MongoDBConnection.instance) {
      MongoDBConnection.instance = new MongoDBConnection(config);
    }
    return MongoDBConnection.instance;
  }
}

export default MongoDBConnection;
