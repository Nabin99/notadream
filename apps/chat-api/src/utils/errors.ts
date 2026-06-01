/**
 * Errors - Custom error classes and handlers
 */

import type { ChatError } from '../types';

export class ChatApiError extends Error implements ChatError {
  code: ChatError['code'];
  status: number;
  details?: Record<string, unknown>;

  constructor(
    code: ChatError['code'],
    message: string,
    status: number = 500,
    details?: Record<string, unknown>,
  ) {
    super(message);
    this.code = code;
    this.status = status;
    this.details = details;
    this.name = 'ChatApiError';
  }
}

export class ValidationError extends ChatApiError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('VALIDATION_ERROR', message, 400, details);
    this.name = 'ValidationError';
  }
}

export class RateLimitError extends ChatApiError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('RATE_LIMIT', message, 429, details);
    this.name = 'RateLimitError';
  }
}

export class QuotaExceededError extends ChatApiError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('QUOTA_EXCEEDED', message, 429, details);
    this.name = 'QuotaExceededError';
  }
}

export class GeminiApiError extends ChatApiError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('API_ERROR', message, 503, details);
    this.name = 'GeminiApiError';
  }
}

/**
 * Check if error is ChatApiError
 */
export const isChatApiError = (error: unknown): error is ChatApiError => {
  return error instanceof ChatApiError;
};

/**
 * Convert any error to ChatApiError
 */
export const toChatApiError = (error: unknown): ChatApiError => {
  if (isChatApiError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return new ChatApiError('UNKNOWN_ERROR', error.message, 500);
  }

  return new ChatApiError('UNKNOWN_ERROR', 'An unexpected error occurred', 500);
};

/**
 * Create error response
 */
export const createErrorResponse = (error: ChatApiError) => ({
  success: false,
  error: {
    code: error.code,
    message: error.message,
  },
});
