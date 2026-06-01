/**
 * Transformers - Pure data transformation functions
 */

import type { ChatMessage, ChatResponse } from '../types';

/**
 * Format Gemini API response to application format
 */
export const formatGeminiResponse = (text: string): string => {
  return text.trim();
};

/**
 * Normalize user input message
 */
export const normalizeUserMessage = (message: string): string => {
  return message.trim();
};

/**
 * Create success response
 */
export const createSuccessResponse = (
  message: string,
  sessionId?: string,
): ChatResponse => {
  return {
    success: true,
    data: {
      message,
      timestamp: Date.now(),
      sessionId,
    },
  };
};

/**
 * Create error response
 */
export const createErrorResponse = (
  code: ChatResponse['error']['code'],
  message: string,
): ChatResponse => {
  return {
    success: false,
    error: {
      code,
      message,
    },
  };
};

/**
 * Format message for Gemini API
 */
export const formatMessageForGemini = (message: string): ChatMessage => {
  return {
    role: 'user',
    content: normalizeUserMessage(message),
    timestamp: Date.now(),
  };
};

/**
 * Format Gemini response as chat message
 */
export const formatGeminiAsMessage = (text: string): ChatMessage => {
  return {
    role: 'assistant',
    content: formatGeminiResponse(text),
    timestamp: Date.now(),
  };
};

/**
 * Escape HTML entities for safety
 */
export const escapeHtml = (text: string): string => {
  const escapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
  };

  return text.replace(/[&<>"']/g, (char) => escapeMap[char] || char);
};

/**
 * Sanitize message before storage/display
 */
export const sanitizeMessage = (message: string): string => {
  return escapeHtml(normalizeUserMessage(message));
};
