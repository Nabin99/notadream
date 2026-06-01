/**
 * useChat Hook - Core chat state management
 * Uses reducer for testable, pure state logic
 */

import { useCallback, useReducer, useEffect } from 'react';

import type { ChatMessage, ChatState } from '../types/chat';
import { chatReducer, getInitialChatState } from '../utils/chat-reducer';
import {
  saveSessionMessages,
  getSessionMessages,
  saveSessionId,
  getSessionId,
  generateSessionId,
} from '../utils/chat-storage';

interface UseChatOptions {
  initialMessages?: ChatMessage[];
  sessionId?: string;
  onError?: (error: string) => void;
}

interface UseChatReturn {
  state: ChatState;
  addMessage: (message: ChatMessage) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearMessages: () => void;
  setSessionId: (id: string) => void;
}

export const useChat = (options: UseChatOptions = {}): UseChatReturn => {
  const { initialMessages, sessionId: initialSessionId, onError } = options;

  // Initialize state
  const [state, dispatch] = useReducer(
    chatReducer,
    null,
    () => {
      const stored = getSessionMessages();
      const sid = initialSessionId || getSessionId() || generateSessionId();

      return {
        ...getInitialChatState(sid),
        messages: initialMessages || stored,
      };
    },
  );

  // Save messages to session storage whenever they change
  useEffect(() => {
    saveSessionMessages(state.messages);
  }, [state.messages]);

  // Save session ID to storage
  useEffect(() => {
    if (state.sessionId) {
      saveSessionId(state.sessionId);
    }
  }, [state.sessionId]);

  // Call error callback when error occurs
  useEffect(() => {
    if (state.error && onError) {
      onError(state.error);
    }
  }, [state.error, onError]);

  // Action creators
  const addMessage = useCallback((message: ChatMessage) => {
    dispatch({ type: 'ADD_MESSAGE', payload: message });
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const clearMessages = useCallback(() => {
    dispatch({ type: 'CLEAR_MESSAGES' });
  }, []);

  const setSessionIdAction = useCallback((id: string) => {
    dispatch({ type: 'SET_SESSION_ID', payload: id });
  }, []);

  return {
    state,
    addMessage,
    setLoading,
    setError,
    clearMessages,
    setSessionId: setSessionIdAction,
  };
};

export default useChat;
