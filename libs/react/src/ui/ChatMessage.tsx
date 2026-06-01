/**
 * ChatMessage Component - Renders a single chat message
 * Atomic: displays one message with role-based styling
 */

import React from 'react';

import type { ChatMessage as ChatMessageType } from '../types/chat';
import { formatMessageTime } from '../utils/chat-formatter';

interface ChatMessageProps {
  message: ChatMessageType;
  isLastMessage?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLastMessage = false }) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={`nd-chat-message nd-chat-message--${isUser ? 'user' : 'assistant'}`}
      data-testid={`chat-message-${isUser ? 'user' : 'assistant'}`}
      style={{
        display: 'flex',
        marginBottom: isLastMessage ? '0' : '16px',
        gap: '12px',
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-end',
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: isUser
            ? 'var(--nd-colors-accent, #16c7d5)'
            : 'var(--nd-colors-primary, #212529)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isUser
            ? 'var(--nd-colors-primary, #212529)'
            : 'var(--nd-colors-accent, #16c7d5)',
          fontSize: '16px',
          fontWeight: 'bold',
          flexShrink: 0,
        }}
      >
        {isUser ? 'You' : 'AI'}
      </div>

      {/* Message Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <div
          style={{
            backgroundColor: isUser
              ? 'var(--nd-colors-accent, #16c7d5)'
              : 'var(--nd-colors-primary, #212529)',
            color: isUser
              ? 'var(--nd-colors-primary, #212529)'
              : 'var(--nd-colors-accent, #16c7d5)',
            padding: '12px 16px',
            borderRadius: '12px',
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            fontSize: '14px',
            lineHeight: '1.5',
            maxWidth: '300px',
          }}
        >
          {message.content}
        </div>
        <time
          style={{
            fontSize: '12px',
            color: 'var(--nd-colors-text-secondary, #666)',
            paddingLeft: isUser ? '0' : '48px',
            paddingRight: isUser ? '48px' : '0',
          }}
        >
          {formatMessageTime(message.timestamp)}
        </time>
      </div>
    </div>
  );
};

export default ChatMessage;
