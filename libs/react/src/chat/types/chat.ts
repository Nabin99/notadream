/**
 * Chat Types - Shared across frontend and backend
 */

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatRequest {
  message: string;
  sessionId?: string;
  locale?: string;
}

export interface ChatResponse {
  success: boolean;
  data?: {
    message: string;
    timestamp: number;
    sessionId?: string;
  };
  error?: {
    code: string;
    message: string;
  };
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sessionId?: string;
}

export interface ChatContextType {
  state: ChatState;
  sendMessage: (message: string, locale?: string) => Promise<void>;
  clearMessages: () => void;
  setSessionId: (id: string) => void;
}
