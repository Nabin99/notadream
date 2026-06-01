/**
 * Chat Module - AI chat assistant types, components, hooks, and utilities
 * Organized: All chat-related functionality in one place
 */

// Types
export * from './types/chat';

// Utilities
export {
  formatTimestamp,
  escapeHtml,
  formatMessage,
  formatDate,
  isToday,
  formatMessageTime,
} from './utils/chat-formatter';

export {
  saveSessionMessages,
  getSessionMessages,
  clearSessionMessages,
  saveSessionId,
  getSessionId,
  generateSessionId,
} from './utils/chat-storage';

export { chatReducer, getInitialChatState } from './utils/chat-reducer';
export type { ChatAction } from './utils/chat-reducer';

// Components
export { ChatMessage } from './ui/ChatMessage';
export { ChatWindow } from './ui/ChatWindow';
export { ChatInput } from './ui/ChatInput';
export { ChatBubble } from './ui/ChatBubble';
export { LoadingIndicator } from './ui/LoadingIndicator';

// Hooks
export { useChat } from './hooks/useChat';
export { useChatScroll } from './hooks/useChatScroll';
export { useLocalStorage } from './hooks/useLocalStorage';

// API Client
export {
  sendMessage,
  retryMessage,
  validateResponse,
  createHeaders,
} from './services/chat-api-client';
