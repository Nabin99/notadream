/**
 * Chat Formatter - Pure formatting utilities
 */

/**
 * Format timestamp to readable time string
 */
export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

/**
 * Escape HTML entities for safety
 */
export const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char] || char);
};

/**
 * Format message content - trim and escape
 */
export const formatMessage = (content: string): string => {
  return escapeHtml(content.trim());
};

/**
 * Format date to readable string
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Check if timestamp is today
 */
export const isToday = (timestamp: number): boolean => {
  const today = new Date();
  const date = new Date(timestamp);
  return (
    today.getFullYear() === date.getFullYear()
    && today.getMonth() === date.getMonth()
    && today.getDate() === date.getDate()
  );
};

/**
 * Format message time - "Today 14:30" or "Dec 25"
 */
export const formatMessageTime = (timestamp: number): string => {
  if (isToday(timestamp)) {
    return `Today ${formatTimestamp(timestamp)}`;
  }
  return formatDate(new Date(timestamp));
};
