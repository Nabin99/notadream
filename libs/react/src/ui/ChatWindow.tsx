/**
 * ChatWindow Component - Displays message list with auto-scroll
 * Atomic: only renders messages and handles scroll
 */

import React, { useEffect, useRef } from 'react';

import type { ChatMessage } from '../types/chat';
import ChatMessage from './ChatMessage';

interface ChatWindowProps {
  messages: ChatMessage[];
  isLoading?: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading = false }) => {
  const endRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      className="nd-chat-window"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        overflowY: 'auto',
        flex: 1,
        padding: '16px',
        backgroundColor: 'var(--nd-colors-bg, #f8f9fa)',
        borderRadius: '8px 8px 0 0',
      }}
    >
      {messages.length === 0 && !isLoading && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
            color: 'var(--nd-colors-text-secondary, #666)',
            fontSize: '14px',
            textAlign: 'center',
          }}
        >
          <p>No messages yet. Start a conversation!</p>
        </div>
      )}

      {messages.map((message, index) => (
        <ChatMessage
          key={`${message.timestamp}-${index}`}
          message={message}
          isLastMessage={index === messages.length - 1}
        />
      ))}

      {isLoading && (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '12px',
            marginTop: '8px',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--nd-colors-primary, #212529)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--nd-colors-accent, #16c7d5)',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            AI
          </div>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--nd-colors-accent, #16c7d5)',
                animation: 'pulse 1.4s ease-in-out infinite',
              }}
            />
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--nd-colors-accent, #16c7d5)',
                animation: 'pulse 1.4s ease-in-out 0.2s infinite',
              }}
            />
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--nd-colors-accent, #16c7d5)',
                animation: 'pulse 1.4s ease-in-out 0.4s infinite',
              }}
            />
          </div>
        </div>
      )}

      {/* Auto-scroll anchor */}
      <div ref={endRef} />
    </div>
  );
};

export default ChatWindow;
