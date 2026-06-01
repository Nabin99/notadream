/**
 * Chat Storage - Session storage helpers
 */

import type { ChatMessage } from '../types/chat';

const STORAGE_KEY = 'notadream-chat-session';

/**
 * Save chat messages to session storage
 */
export const saveSessionMessages = (messages: ChatMessage[]): void => {
  if (typeof sessionStorage === 'undefined') return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.warn('Failed to save chat session:', error);
  }
};

/**
 * Get chat messages from session storage
 */
export const getSessionMessages = (): ChatMessage[] => {
  if (typeof sessionStorage === 'undefined') return [];
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Failed to load chat session:', error);
    return [];
  }
};

/**
 * Clear chat messages from session storage
 */
export const clearSessionMessages = (): void => {
  if (typeof sessionStorage === 'undefined') return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear chat session:', error);
  }
};

/**
 * Save session ID to session storage
 */
export const saveSessionId = (sessionId: string): void => {
  if (typeof sessionStorage === 'undefined') return;
  try {
    sessionStorage.setItem(`${STORAGE_KEY}-id`, sessionId);
  } catch (error) {
    console.warn('Failed to save session ID:', error);
  }
};

/**
 * Get session ID from session storage
 */
export const getSessionId = (): string | null => {
  if (typeof sessionStorage === 'undefined') return null;
  try {
    return sessionStorage.getItem(`${STORAGE_KEY}-id`);
  } catch (error) {
    console.warn('Failed to load session ID:', error);
    return null;
  }
};

/**
 * Generate a unique session ID
 */
export const generateSessionId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
