/**
 * ChatBubble Component - Floating bubble container (collapsible)
 * Atomic: manages bubble visibility and layout
 */

import React, { useState } from 'react';

interface ChatBubbleProps {
  children: React.ReactNode;
  title?: string;
  defaultOpen?: boolean;
  position?: 'bottom-right' | 'bottom-left';
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  children,
  title = 'Chat',
  defaultOpen = false,
  position = 'bottom-right',
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const positionStyle =
    position === 'bottom-right'
      ? { bottom: '20px', right: '20px' }
      : { bottom: '20px', left: '20px' };

  return (
    <div
      className="nd-chat-bubble-container"
      style={{
        position: 'fixed',
        ...positionStyle,
        zIndex: 9999,
        fontFamily: 'inherit',
      }}
    >
      {isOpen && (
        <div
          className="nd-chat-window-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '380px',
            maxWidth: '90vw',
            height: '500px',
            maxHeight: '80vh',
            backgroundColor: 'var(--nd-colors-bg, #f8f9fa)',
            borderRadius: '12px',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
            marginBottom: '16px',
            border: '1px solid var(--nd-colors-border, #e0e0e0)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: 'var(--nd-colors-accent, #16c7d5)',
              color: 'var(--nd-colors-primary, #212529)',
              borderBottom: '1px solid var(--nd-colors-border, #e0e0e0)',
            }}
          >
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{title}</h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
                fontSize: '20px',
                padding: '0',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Close chat"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column', overflow: 'hidden' }}>
            {children}
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--nd-colors-accent, #16c7d5)',
          color: 'var(--nd-colors-primary, #212529)',
          border: 'none',
          cursor: 'pointer',
          fontSize: '24px',
          fontWeight: 'bold',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isOpen ? 0.5 : 1,
        }}
        onMouseEnter={(e) => {
          if (!isOpen) {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)';
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
        }}
        title={isOpen ? 'Close' : 'Open chat'}
      >
        {isOpen ? '−' : '💬'}
      </button>
    </div>
  );
};

export default ChatBubble;
