import { useState } from 'react';

// Simple hook to read/write a value to localStorage.
// Will be used in later phases to persist mock applications, profile edits, etc.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = (newValue) => {
    setValue(newValue);
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch {
      // Ignore write errors (e.g. storage full or disabled)
    }
  };

  return [value, setStoredValue];
}
