/**
 * LoadingIndicator Component - Animated loading state
 * Atomic: just displays loading animation
 */

import React from 'react';

interface LoadingIndicatorProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = 'medium',
  color = 'var(--nd-colors-accent, #16c7d5)',
}) => {
  const sizeMap = {
    small: { width: '20px', height: '20px', dotSize: '4px' },
    medium: { width: '32px', height: '32px', dotSize: '6px' },
    large: { width: '48px', height: '48px', dotSize: '8px' },
  };

  const { width, height, dotSize } = sizeMap[size];

  const dotStyle = {
    width: dotSize,
    height: dotSize,
    borderRadius: '50%',
    backgroundColor: color,
    animation: 'pulse 1.4s ease-in-out infinite',
  };

  return (
    <div
      className="nd-loading-indicator"
      style={{
        display: 'flex',
        gap: `calc(${dotSize} / 2)`,
        alignItems: 'center',
        justifyContent: 'center',
        width,
        height,
      }}
    >
      <span style={{ ...dotStyle, animationDelay: '0s' }} />
      <span style={{ ...dotStyle, animationDelay: '0.2s' }} />
      <span style={{ ...dotStyle, animationDelay: '0.4s' }} />
    </div>
  );
};

export default LoadingIndicator;
