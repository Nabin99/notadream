/**
 * ChatInput Component - Message input with send button
 * Atomic: controlled component, no state management
 */

import React, { useState } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  isLoading = false,
  disabled = false,
  placeholder = 'Type your message...',
}) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    const message = input.trim();
    if (message) {
      onSend(message);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="nd-chat-input-container"
      style={{
        display: 'flex',
        gap: '8px',
        padding: '16px',
        backgroundColor: 'var(--nd-colors-bg, #f8f9fa)',
        borderRadius: '0 0 8px 8px',
        borderTop: '1px solid var(--nd-colors-border, #e0e0e0)',
      }}
    >
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled || isLoading}
        placeholder={placeholder}
        className="nd-chat-input"
        style={{
          flex: 1,
          padding: '12px',
          borderRadius: '6px',
          border: '1px solid var(--nd-colors-border, #e0e0e0)',
          backgroundColor: 'var(--nd-colors-input-bg, #fff)',
          color: 'var(--nd-colors-text, #333)',
          fontFamily: 'inherit',
          fontSize: '14px',
          lineHeight: '1.5',
          resize: 'none',
          minHeight: '44px',
          maxHeight: '100px',
          opacity: disabled ? 0.6 : 1,
        }}
      />
      <button
        onClick={handleSend}
        disabled={disabled || isLoading || !input.trim()}
        className="nd-chat-send-btn"
        style={{
          padding: '12px 16px',
          backgroundColor: input.trim()
            ? 'var(--nd-colors-accent, #16c7d5)'
            : 'var(--nd-colors-border, #e0e0e0)',
          color: input.trim()
            ? 'var(--nd-colors-primary, #212529)'
            : 'var(--nd-colors-text-secondary, #999)',
          border: 'none',
          borderRadius: '6px',
          cursor: input.trim() ? 'pointer' : 'not-allowed',
          fontWeight: 'bold',
          fontSize: '14px',
          transition: 'all 0.2s ease',
          opacity: disabled || isLoading ? 0.6 : 1,
          minWidth: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title={isLoading ? 'Sending...' : 'Send message (Enter)'}
      >
        {isLoading ? '...' : '→'}
      </button>
    </div>
  );
};

export default ChatInput;
