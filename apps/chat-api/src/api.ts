/**
 * Chat API Server - Main Fastify setup
 */

import fastify from 'fastify';
import cors from 'fastify-cors';

import { chatRoutes } from './routes/chat';
import config from './config/config';

export const createServer = async () => {
  const server = await fastify({
    logger: {
      level: config.nodeEnv === 'production' ? 'info' : 'debug',
    },
  });

  // Register CORS
  await server.register(cors, {
    origin: true, // Allow all origins (can be restricted in production)
    credentials: true,
  });

  // Register routes
  await server.register(chatRoutes);

  return server;
};

export default createServer;
