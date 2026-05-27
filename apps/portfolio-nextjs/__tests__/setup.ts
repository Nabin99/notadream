/**
 * Jest setup file
 * Runs before all tests
 */

import '@testing-library/jest-dom';

// Polyfill TextEncoder for Node.js
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// Mock Firebase
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({})),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({
    _key: { path: { segments: ['projects', 'test'] } },
  })),
  collection: jest.fn((db, name) => ({ _key: { path: { segments: ['projects', name] } } })),
  query: jest.fn((...args) => args),
  getDocs: jest.fn(() =>
    Promise.resolve({
      docs: [],
    })
  ),
  onSnapshot: jest.fn((query, callback) => {
    callback({ docs: [] });
    return jest.fn();
  }),
  orderBy: jest.fn((field, direction) => ({
    _key: { collectionGroup: field },
  })),
  addDoc: jest.fn(() => Promise.resolve({ id: 'test-id' })),
  updateDoc: jest.fn(() => Promise.resolve()),
  deleteDoc: jest.fn(() => Promise.resolve()),
  doc: jest.fn((db, collection, id) => ({
    _key: { path: { segments: ['projects', collection, id] } },
  })),
}));

// Mock environment variables
process.env.NEXT_PUBLIC_FIREBASE_API_KEY = 'test-key';
process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = 'test.firebaseapp.com';
process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'test-project';
process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = 'test.appspot.com';
process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = '123456789';
process.env.NEXT_PUBLIC_FIREBASE_APP_ID = '1:123456789:web:test';

// Suppress console warnings in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
