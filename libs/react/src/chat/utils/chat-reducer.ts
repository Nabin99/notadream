/**
 * Chat Reducer - Pure reducer logic for chat state management
 */

import type { ChatMessage, ChatState } from '../types/chat';

export type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_MESSAGES' }
  | { type: 'SET_SESSION_ID'; payload: string }
  | { type: 'INITIALIZE'; payload: ChatState };

/**
 * Chat state reducer
 */
export const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        error: null,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case 'CLEAR_MESSAGES':
      return {
        ...state,
        messages: [],
        error: null,
      };

    case 'SET_SESSION_ID':
      return {
        ...state,
        sessionId: action.payload,
      };

    case 'INITIALIZE':
      return action.payload;

    default:
      return state;
  }
};

/**
 * Get initial chat state
 */
export const getInitialChatState = (sessionId?: string): ChatState => {
  return {
    messages: [],
    isLoading: false,
    error: null,
    sessionId,
  };
};
