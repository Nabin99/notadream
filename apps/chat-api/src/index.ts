/**
 * Chat API Server Entry Point
 */

import createServer from './api';
import config from './config/config';

const start = async () => {
  try {
    const server = await createServer();

    server.listen({ port: config.port, host: '0.0.0.0' }, (err, address) => {
      if (err) {
        server.log.error(err);
        process.exit(1);
      }

      server.log.info(`Chat API Server listening at ${address}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

start();
