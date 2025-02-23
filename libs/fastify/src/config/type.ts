/**
 * API Configuration Settings
 * Provides flexibility, customization, security, and performance tuning for the API.
 */

import { MongoClientOptions } from "mongodb";

export interface APIDatabaseConfig {
  type: "sql" | "nosql"; // Database type
  sql?: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  nosql?: NoSQLDatabaseConfig[];
  enablePooling: boolean; // Use connection pooling for performance
}

export interface NoSQLDatabaseConfig {
  uri: string; // Connection string for NoSQL databases
  options: MongoClientOptions;
  name: string;
}

export interface APIConfig {
  /**
   * General API settings
   */
  appName: string; // Application name
  environment: "development" | "staging" | "production"; // Current environment
  port: number; // Port for the server to listen on
  baseUrl: string; // Base URL of the API

  /**
   * Authentication & Security
   */
  auth: {
    enableAuth: boolean; // Enable or disable authentication
    jwtSecret: string; // Secret key for JWT authentication
    refreshSecret: string; // Secret key for JWT authentication refresh
    jwtExpiration: string; // JWT expiration time (e.g., '1h', '7d')
    allowGuestAccess: boolean; // Allow guest access to certain endpoints
    passwordSaltRounds: number; // Bcrypt salt rounds for password hashing
    refreshExpiration: string;
  };

  /**
   * Rate Limiting
   */
  // rateLimit: {
  //   enabled: boolean; // Enable rate limiting
  //   requestsPerMinute: number; // Max requests per minute per IP
  // };

  /**
   * Logging Configuration
   */
  // logging: {
  //   level: "debug" | "info" | "warn" | "error"; // Logging level
  //   logToFile: boolean; // Enable logging to a file
  //   logFilePath: string; // Path to log file
  // };

  /**
   * Database Configuration
   */
  database: APIDatabaseConfig;

  /**
   * API Versioning
   */
  // versioning: {
  //   strategy: "uri" | "header" | "query-param"; // API versioning strategy
  //   defaultVersion: string; // Default API version
  // };

  /**
   * CORS Configuration
   */
  cors: {
    allowedOrigins: string[]; // List of allowed origins
    allowedMethods: string[]; // List of allowed HTTP methods
    allowedHeaders: string[]; // List of allowed headers
    credentials: boolean; // Allow credentials (cookies, authorization headers)
  };

  /**
   * Caching & Performance
   */
  // caching: {
  //   enabled: boolean; // Enable or disable caching
  //   cacheProvider: "memory" | "redis"; // Cache storage provider
  //   ttlSeconds: number; // Time to live for cache entries
  //   redisConfig?: {
  //     host: string;
  //     port: number;
  //     password?: string;
  //   };
  // };

  /**
   * Feature Flags (Toggle API Features Dynamically)
   */
  // featureFlags: {
  //   enableNewFeatureX: boolean;
  //   enableBetaEndpoints: boolean;
  // };

  /**
   * Queue & Event Handling (For Background Jobs & Webhooks)
   */
  // queue: {
  //   enabled: boolean; // Enable async processing
  //   provider: "rabbitmq" | "kafka" | "sqs"; // Messaging queue provider
  //   connectionString: string; // Connection details
  // };

  /**
   * Payments Configuration
   */
  // payments: {
  //   enabled: boolean;
  //   providers: ("stripe" | "paypal" | "square")[]; // Payment providers
  //   defaultProvider: "stripe" | "paypal" | "square";
  // };

  /**
   * AI & Analytics (For Smart Processing)
   */
  // analytics: {
  //   enabled: boolean;
  //   provider: "google-analytics" | "mixpanel" | "custom";
  //   trackingId: string;
  // };

  /**
   * Admin Panel & Role-Based Access Control
   */
  // admin: {
  //   enableAdminPanel: boolean; // Enable web-based admin panel
  //   roles: string[]; // Define available roles (e.g., ['admin', 'editor', 'viewer'])
  //   permissions: Record<string, string[]>; // Role-based permissions
  // };

  /**
   * Backup & Recovery (Disaster Handling)
   */
  // backup: {
  //   enabled: boolean;
  //   frequency: "daily" | "weekly" | "monthly";
  //   storage: "local" | "cloud"; // Backup storage location
  //   cloudConfig?: {
  //     provider: "aws-s3" | "google-cloud";
  //     bucketName: string;
  //   };
  // };
}

export default APIConfig;
