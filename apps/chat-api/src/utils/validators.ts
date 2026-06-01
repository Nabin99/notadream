/**
 * Validators - Pure validation functions for chat system
 */

import type { ChatRequest } from '../types';

const MAX_MESSAGE_LENGTH = 1000;
const MIN_MESSAGE_LENGTH = 1;

/**
 * Validate chat request message
 */
export const validateMessage = (message: string): { valid: boolean; error?: string } => {
  if (typeof message !== 'string') {
    return { valid: false, error: 'Message must be a string' };
  }

  if (message.length < MIN_MESSAGE_LENGTH) {
    return { valid: false, error: 'Message cannot be empty' };
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return { valid: false, error: `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters` };
  }

  return { valid: true };
};

/**
 * Validate session ID format (optional)
 */
export const validateSessionId = (sessionId?: string): { valid: boolean; error?: string } => {
  if (!sessionId) {
    return { valid: true }; // Session ID is optional
  }

  if (typeof sessionId !== 'string') {
    return { valid: false, error: 'Session ID must be a string' };
  }

  if (sessionId.length < 1 || sessionId.length > 100) {
    return { valid: false, error: 'Session ID must be between 1 and 100 characters' };
  }

  return { valid: true };
};

/**
 * Validate locale format
 */
export const validateLocale = (locale?: string): { valid: boolean; error?: string } => {
  const supportedLocales = ['en', 'fr', 'es', 'de', 'it', 'pt'];

  if (!locale) {
    return { valid: true }; // Locale is optional, defaults to 'en'
  }

  if (typeof locale !== 'string') {
    return { valid: false, error: 'Locale must be a string' };
  }

  if (!supportedLocales.includes(locale)) {
    return { valid: false, error: `Unsupported locale. Supported: ${supportedLocales.join(', ')}` };
  }

  return { valid: true };
};

/**
 * Validate entire chat request
 */
export const validateChatRequest = (request: unknown): { valid: boolean; error?: string } => {
  if (typeof request !== 'object' || request === null) {
    return { valid: false, error: 'Request must be an object' };
  }

  const req = request as ChatRequest;

  const messageValidation = validateMessage(req.message);
  if (!messageValidation.valid) {
    return messageValidation;
  }

  const sessionValidation = validateSessionId(req.sessionId);
  if (!sessionValidation.valid) {
    return sessionValidation;
  }

  const localeValidation = validateLocale(req.locale);
  if (!localeValidation.valid) {
    return localeValidation;
  }

  return { valid: true };
};
