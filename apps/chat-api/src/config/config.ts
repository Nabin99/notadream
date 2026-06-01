import dotenv from 'dotenv';

dotenv.config();

/**
 * Load and validate environment variables
 */
const validateConfig = () => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const port = process.env.PORT || '4001';

  if (!apiKey) {
    throw new Error('Missing GOOGLE_API_KEY environment variable');
  }

  return {
    apiKey,
    port: Number.parseInt(port, 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    rateLimitWindow: 300000, // 5 minutes
    rateLimitRequests: 20, // 20 requests per window
    geminiFreeLimit: 60, // 60 requests per minute
  };
};

const config = validateConfig();

export default config;
