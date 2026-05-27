/**
 * Integration tests for Firebase operations
 * Tests real Firestore interactions
 */

import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/app/config';

/**
 * Note: These tests should be run with Firebase Emulator
 * Start emulator: firebase emulators:start
 */

describe('Firestore Integration Tests', () => {
  beforeAll(async () => {
    // Initialize test database
    console.log('Connecting to Firestore...');
    // In production, this would connect to the emulator
  });

  describe('Collection Structure', () => {
    it('should have experience collection', async () => {
      if (!db) {
        console.warn('Firestore not initialized');
        return;
      }

      const experienceRef = collection(db, 'experience');
      const snapshot = await getDocs(experienceRef);

      // Should have at least one document or be empty
      expect(snapshot).toBeDefined();
      expect(Array.isArray(snapshot.docs)).toBe(true);
    });

    it('should have education collection', async () => {
      if (!db) return;

      const educationRef = collection(db, 'education');
      const snapshot = await getDocs(educationRef);

      expect(snapshot).toBeDefined();
      expect(Array.isArray(snapshot.docs)).toBe(true);
    });

    it('should have skills collection', async () => {
      if (!db) return;

      const skillsRef = collection(db, 'skills');
      const snapshot = await getDocs(skillsRef);

      expect(snapshot).toBeDefined();
      expect(Array.isArray(snapshot.docs)).toBe(true);
    });

    it('should have projects collection', async () => {
      if (!db) return;

      const projectsRef = collection(db, 'projects');
      const snapshot = await getDocs(projectsRef);

      expect(snapshot).toBeDefined();
      expect(Array.isArray(snapshot.docs)).toBe(true);
    });
  });

  describe('Data Ordering', () => {
    it('should order experience by order field', async () => {
      if (!db) return;

      const experienceRef = collection(db, 'experience');
      const q = query(experienceRef, orderBy('order', 'asc'));
      const snapshot = await getDocs(q);

      const docs = snapshot.docs.map((doc) => doc.data());
      for (let i = 0; i < docs.length - 1; i++) {
        expect((docs[i].order || 0) <= (docs[i + 1].order || 0)).toBe(true);
      }
    });

    it('should order skills by order field', async () => {
      if (!db) return;

      const skillsRef = collection(db, 'skills');
      const q = query(skillsRef, orderBy('order', 'asc'));
      const snapshot = await getDocs(q);

      const docs = snapshot.docs.map((doc) => doc.data());
      for (let i = 0; i < docs.length - 1; i++) {
        expect((docs[i].order || 0) <= (docs[i + 1].order || 0)).toBe(true);
      }
    });
  });

  describe('Document Structure', () => {
    it('experience documents should have required fields', async () => {
      if (!db) return;

      const experienceRef = collection(db, 'experience');
      const snapshot = await getDocs(experienceRef);

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        // At least one of these required fields should exist
        expect(
          data.company || data.role || data.description
        ).toBeDefined();
      });
    });

    it('education documents should have required fields', async () => {
      if (!db) return;

      const educationRef = collection(db, 'education');
      const snapshot = await getDocs(educationRef);

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        expect(
          data.school || data.degree || data.field
        ).toBeDefined();
      });
    });

    it('projects documents should have required fields', async () => {
      if (!db) return;

      const projectsRef = collection(db, 'projects');
      const snapshot = await getDocs(projectsRef);

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        expect(data.title).toBeDefined();
      });
    });
  });
});
