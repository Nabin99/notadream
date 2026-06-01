/**
 * Chat API Client - Pure functions for backend communication
 */

import type { ChatMessage, ChatRequest, ChatResponse } from '../types/chat';

// Default API base URL (can be overridden)
const DEFAULT_API_BASE = '/api';

interface SendMessageOptions {
  apiBase?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

interface SendMessageResult {
  success: boolean;
  message?: ChatMessage;
  error?: string;
  errorCode?: string;
}

/**
 * Send message to chat API
 */
export const sendMessage = async (
  userMessage: string,
  options: SendMessageOptions = {},
): Promise<SendMessageResult> => {
  const { apiBase = DEFAULT_API_BASE, timeout = 30000, headers = {} } = options;

  try {
    const request: ChatRequest = {
      message: userMessage,
      locale: navigator?.language?.split('-')[0] || 'en',
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(`${apiBase}/chat/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(request),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data: ChatResponse = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error?.message || 'Failed to send message',
        errorCode: data.error?.code,
      };
    }

    if (data.success && data.data?.message) {
      return {
        success: true,
        message: data.data.message,
      };
    }

    return {
      success: false,
      error: 'Invalid response from server',
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          success: false,
          error: 'Request timeout',
          errorCode: 'TIMEOUT',
        };
      }
      return {
        success: false,
        error: error.message,
        errorCode: 'NETWORK_ERROR',
      };
    }
    return {
      success: false,
      error: 'Unknown error',
    };
  }
};

/**
 * Retry logic for failed messages
 */
interface RetryOptions extends SendMessageOptions {
  maxRetries?: number;
  backoffMs?: number;
}

export const retryMessage = async (
  message: string,
  options: RetryOptions = {},
): Promise<SendMessageResult> => {
  const { maxRetries = 3, backoffMs = 1000, ...sendOptions } = options;

  let lastError: SendMessageResult | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const result = await sendMessage(message, sendOptions);

      if (result.success) {
        return result;
      }

      // Don't retry validation errors
      if (result.errorCode === 'VALIDATION_ERROR' || result.errorCode === 'RATE_LIMIT_ERROR') {
        return result;
      }

      lastError = result;

      if (attempt < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, backoffMs * Math.pow(2, attempt)));
      }
    } catch (error) {
      lastError = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  return lastError || { success: false, error: 'Max retries exceeded' };
};

/**
 * Validate API response structure
 */
export const validateResponse = (data: unknown): data is ChatResponse => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const response = data as Record<string, unknown>;

  if (typeof response.success !== 'boolean') {
    return false;
  }

  if (response.success && response.data) {
    const responseData = response.data as Record<string, unknown>;
    if (!responseData.message || typeof (responseData.message as Record<string, unknown>).content !== 'string') {
      return false;
    }
  }

  if (!response.success && response.error) {
    const error = response.error as Record<string, unknown>;
    if (typeof error.message !== 'string') {
      return false;
    }
  }

  return true;
};

/**
 * Create headers with optional auth token
 */
export const createHeaders = (authToken?: string): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  return headers;
};
