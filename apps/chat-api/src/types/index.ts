/**
 * Chat API Types - Core type definitions for chat system
 */

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
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

export interface ChatError {
  code: 'VALIDATION_ERROR' | 'QUOTA_EXCEEDED' | 'API_ERROR' | 'RATE_LIMIT' | 'UNKNOWN_ERROR';
  message: string;
  status: number;
  details?: Record<string, unknown>;
}

export interface QuotaStatus {
  remaining: number;
  resetTime: number;
}

export interface SystemPromptConfig {
  locale: string;
  role: string;
  context: string;
}
