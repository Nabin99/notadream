/**
 * Rate Limit Middleware - Protect API from abuse
 */

import type { FastifyRequest, FastifyReply } from 'fastify';

import config from '../config/config';
import { RateLimitError, QuotaExceededError } from '../utils/errors';
import {
  hasIpQuotaRemaining,
  decrementIpQuota,
  hasGlobalQuotaRemaining,
  decrementGlobalQuota,
} from '../utils/quota-manager';

/**
 * Extract client IP from request
 */
const getClientIp = (request: FastifyRequest): string => {
  const forwarded = request.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }

  return request.ip;
};

/**
 * Rate limiting middleware
 */
export const rateLimitMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const ip = getClientIp(request);

  // Check global quota (Gemini free tier limit: 60 requests/minute)
  if (!hasGlobalQuotaRemaining()) {
    throw new QuotaExceededError(
      'Service temporarily unavailable due to rate limiting. Please try again in 1 minute.',
      { ip, global: true },
    );
  }

  // Check IP-based quota (per-IP limit: 20 requests per 5 minutes)
  const ipLimit = config.rateLimitRequests;
  const ipWindow = config.rateLimitWindow;

  if (!hasIpQuotaRemaining(ip, ipWindow, ipLimit)) {
    throw new RateLimitError(
      `You have exceeded the rate limit. Maximum ${ipLimit} requests per ${ipWindow / 1000 / 60} minutes.`,
      {
        ip,
        limit: ipLimit,
        window: ipWindow,
      },
    );
  }

  // Decrement quotas
  decrementIpQuota(ip, ipWindow);
  decrementGlobalQuota();

  // Add quota info to reply headers
  reply.header('X-RateLimit-Limit', ipLimit.toString());
  reply.header(
    'X-RateLimit-Remaining',
    Math.max(0, ipLimit - (quotaStore.get(ip)?.requests ?? 0)).toString(),
  );
};

// Reexport for potential quota inspection
import { getIpQuotaRemaining } from '../utils/quota-manager';

// This is a temporary reference - in real implementation this would be handled differently
// For now we use it just for the middleware to avoid circular imports
const quotaStore = new Map<string, { requests: number; resetTime: number }>();
