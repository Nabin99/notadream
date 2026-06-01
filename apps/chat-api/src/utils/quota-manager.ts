/**
 * Quota Manager - Track and manage API quota
 * This is an in-memory implementation. Can be swapped with Redis for production.
 */

import type { QuotaStatus } from '../types';

interface IpQuota {
  requests: number;
  resetTime: number;
}

/**
 * In-memory quota store (IP -> quota tracking)
 */
const quotaStore = new Map<string, IpQuota>();

/**
 * Global quota tracking for Gemini free tier (60 req/min)
 */
let globalRequestsThisMinute = 0;
let globalResetTime = Date.now() + 60000; // Reset every minute

/**
 * Get remaining quota for an IP
 */
export const getIpQuotaRemaining = (ip: string, window: number, limit: number): number => {
  const now = Date.now();
  const quota = quotaStore.get(ip);

  if (!quota || now > quota.resetTime) {
    return limit;
  }

  return Math.max(0, limit - quota.requests);
};

/**
 * Check if IP has quota remaining
 */
export const hasIpQuotaRemaining = (ip: string, window: number, limit: number): boolean => {
  return getIpQuotaRemaining(ip, window, limit) > 0;
};

/**
 * Decrement IP quota
 */
export const decrementIpQuota = (ip: string, window: number): void => {
  const now = Date.now();
  const quota = quotaStore.get(ip);

  if (!quota || now > quota.resetTime) {
    quotaStore.set(ip, {
      requests: 1,
      resetTime: now + window,
    });
  } else {
    quota.requests += 1;
  }
};

/**
 * Get global quota status (Gemini free tier: 60 requests/minute)
 */
export const getGlobalQuotaStatus = (): QuotaStatus => {
  const now = Date.now();

  if (now > globalResetTime) {
    globalRequestsThisMinute = 0;
    globalResetTime = now + 60000;
  }

  return {
    remaining: Math.max(0, 60 - globalRequestsThisMinute),
    resetTime: globalResetTime,
  };
};

/**
 * Check if global quota has requests remaining
 */
export const hasGlobalQuotaRemaining = (): boolean => {
  const status = getGlobalQuotaStatus();
  return status.remaining > 0;
};

/**
 * Decrement global quota
 */
export const decrementGlobalQuota = (): void => {
  const now = Date.now();

  if (now > globalResetTime) {
    globalRequestsThisMinute = 0;
    globalResetTime = now + 60000;
  }

  globalRequestsThisMinute += 1;
};

/**
 * Reset all quotas (useful for testing)
 */
export const resetQuotas = (): void => {
  quotaStore.clear();
  globalRequestsThisMinute = 0;
  globalResetTime = Date.now() + 60000;
};

/**
 * Get quota debug info (for testing/monitoring)
 */
export const getQuotaDebugInfo = () => ({
  global: getGlobalQuotaStatus(),
  ips: Array.from(quotaStore.entries()).map(([ip, quota]) => ({
    ip,
    requests: quota.requests,
    resetTime: quota.resetTime,
  })),
});
