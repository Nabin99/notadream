/**
 * useChatScroll Hook - Auto-scroll to bottom on message updates
 * Generic: can be used with any list, not just chat
 */

import { useEffect, useRef } from 'react';

interface UseChatScrollOptions {
  behavior?: 'smooth' | 'auto';
  threshold?: number; // How close to bottom before auto-scroll activates (0-1, default 0.9)
}

interface UseChatScrollReturn {
  containerRef: React.RefObject<HTMLDivElement>;
  shouldScroll: boolean;
}

export const useChatScroll = (
  dependency?: unknown[],
  options: UseChatScrollOptions = {},
): UseChatScrollReturn => {
  const { behavior = 'smooth', threshold = 0.9 } = options;
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldScrollRef = useRef(true);

  // Auto-scroll to bottom when dependency changes (e.g., messages)
  useEffect(() => {
    if (containerRef.current && shouldScrollRef.current) {
      containerRef.current.scrollIntoView({ behavior });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependency);

  // Detect if user manually scrolled up
  useEffect(() => {
    const container = containerRef.current?.parentElement;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const percentFromBottom = (scrollHeight - scrollTop - clientHeight) / scrollHeight;
      shouldScrollRef.current = percentFromBottom < 1 - threshold;
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return {
    containerRef,
    shouldScroll: shouldScrollRef.current,
  };
};

export default useChatScroll;
