'use client';

import React, { ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Caught error:', error);
    console.error('[ErrorBoundary] Error info:', errorInfo);
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetError);
      }

      return <DefaultErrorFallback error={this.state.error} reset={this.resetError} />;
    }

    return this.props.children;
  }
}

/**
 * Default error fallback component
 */
function DefaultErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
        <p className="text-gray-600 mb-4">
          An unexpected error occurred. Please try again or contact support if the problem persists.
        </p>
        <details className="mb-6 p-4 bg-gray-100 rounded text-sm">
          <summary className="cursor-pointer font-semibold text-gray-700">Error Details</summary>
          <pre className="mt-2 text-red-600 overflow-auto whitespace-pre-wrap break-words">
            {error.message}
          </pre>
        </details>
        <button
          onClick={reset}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

/**
 * Async Error Boundary - for handling errors in async operations
 */
export function useAsyncError() {
  const [, setError] = React.useState();

  return React.useCallback(
    (error: Error) => {
      setError(() => {
        throw error;
      });
    },
    [setError]
  );
}

/**
 * Firebase-specific error boundary
 */
interface FirebaseErrorBoundaryProps {
  children: ReactNode;
}

export function FirebaseErrorBoundary({ children }: FirebaseErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={(error, reset) => (
        <FirebaseErrorFallback error={error} reset={reset} />
      )}
    >
      {children}
    </ErrorBoundary>
  );
}

function FirebaseErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  const isFirebaseError = error.message.includes('Firebase');
  const isDatabaseError = error.message.includes('Firestore');

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center mb-4">
          <div className="text-3xl mr-3">⚠️</div>
          <h1 className="text-2xl font-bold text-yellow-600">
            {isFirebaseError ? 'Firebase Connection Error' : 'Database Error'}
          </h1>
        </div>
        <p className="text-gray-600 mb-4">
          {isDatabaseError
            ? 'Unable to load portfolio data from the database. This might be temporary. Please try again.'
            : 'An error occurred while connecting to Firebase. Please ensure your configuration is correct.'}
        </p>
        <details className="mb-6 p-4 bg-gray-100 rounded text-sm">
          <summary className="cursor-pointer font-semibold text-gray-700">Error Details</summary>
          <pre className="mt-2 text-red-600 overflow-auto whitespace-pre-wrap break-words">
            {error.message}
          </pre>
        </details>
        <div className="flex gap-3">
          <button
            onClick={reset}
            className="flex-1 bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition"
          >
            Retry
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
          >
            Reload Page
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          If the problem persists, please check your Firebase configuration in{' '}
          <code>.env.local</code> or contact support.
        </p>
      </div>
    </div>
  );
}
