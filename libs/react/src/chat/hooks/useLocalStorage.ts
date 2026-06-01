/**
 * useLocalStorage Hook - Sync state with localStorage
 * Generic: can store any JSON-serializable data
 */

import { useEffect, useState } from 'react';

interface UseLocalStorageOptions {
  serializer?: (value: any) => string;
  deserializer?: (value: string) => any;
}

type SetValue<T> = (value: T | ((val: T) => T)) => void;

interface UseLocalStorageReturn<T> {
  value: T;
  setValue: SetValue<T>;
  remove: () => void;
}

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions = {},
): UseLocalStorageReturn<T> => {
  const { serializer = JSON.stringify, deserializer = JSON.parse } = options;

  // Initialize state from localStorage
  const [value, setValue] = useState<T>(() => {
    try {
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
      return item ? deserializer(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Sync state to localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        if (value === undefined) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, serializer(value));
        }
      }
    } catch (error) {
      console.error(`Failed to save to localStorage [${key}]:`, error);
    }
  }, [key, value, serializer]);

  // Listen for external storage changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setValue(deserializer(e.newValue));
        } catch {
          // Silently fail on parse error
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [key, deserializer]);

  const remove = () => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
      setValue(initialValue);
    } catch (error) {
      console.error(`Failed to remove from localStorage [${key}]:`, error);
    }
  };

  return { value, setValue, remove };
};

export default useLocalStorage;
