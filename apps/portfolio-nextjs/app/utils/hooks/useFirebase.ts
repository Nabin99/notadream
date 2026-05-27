'use client';

// Custom React hooks for fetching portfolio data from Firestore
// These hooks handle data fetching, caching, error handling, and real-time updates

import { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { getAppConfig } from '@notadream/react';
import {
  Experience,
  Education,
  Skill,
  Project,
} from '../types/portfolio';

/**
 * Generic hook for fetching and caching Firestore data
 * @param collectionName - Name of Firestore collection
 * @param dataType - TypeScript type of data in collection
 * @returns Object with data, loading, and error states
 */
function useFirestoreCollection<T extends { id?: string; order?: number }>(
  collectionName: string,
  dataType: string
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCached, setIsCached] = useState(false);

  useEffect(() => {
    // Check localStorage cache first
    const cacheKey = `portfolio-cache-${collectionName}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      try {
        setData(JSON.parse(cachedData));
        setIsCached(true);
        setLoading(false);
        return;
      } catch (e) {
        console.warn(`[Portfolio] Failed to parse cached ${collectionName}:`, e);
      }
    }

    // Get db from AppConfig
    const db = getAppConfig().database?.firebase?.db;

    // If no Firebase instance, show cached data or error
    if (!db) {
      setError(
        `Firebase not initialized. Check NEXT_PUBLIC_FIREBASE_* environment variables.`
      );
      setLoading(false);
      return;
    }

    // Fetch from Firestore
    const fetchData = async () => {
      try {
        const collRef = collection(db, collectionName);
        const q = query(collRef, orderBy('order', 'asc'));
        const snapshot = await getDocs(q);

        const items = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          } as T))
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

        setData(items);
        setIsCached(false);

        // Cache to localStorage for offline support
        localStorage.setItem(cacheKey, JSON.stringify(items));
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error';
        console.error(`[Portfolio] Error fetching ${collectionName}:`, err);
        setError(`Failed to load ${dataType}: ${errorMessage}`);

        // Try to use cached data as fallback
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
          try {
            setData(JSON.parse(cachedData));
            setIsCached(true);
          } catch (e) {
            console.warn(`[Portfolio] Cached data also unavailable`);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName, dataType]);

  return { data, loading, error, isCached };
}

/**
 * Hook to fetch experience data from Firestore
 * @returns Experience data with loading and error states
 */
export function useExperience() {
  return useFirestoreCollection<Experience>('experience', 'experience');
}

/**
 * Hook to fetch education data from Firestore
 * @returns Education data with loading and error states
 */
export function useEducation() {
  return useFirestoreCollection<Education>('education', 'education');
}

/**
 * Hook to fetch all skills (technical and soft) from Firestore
 * @returns Skills grouped by category with loading and error states
 */
export function useSkills() {
  const [technicalSkills, setTechnicalSkills] = useState<Skill[]>([]);
  const [softSkills, setSoftSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCached, setIsCached] = useState(false);

  useEffect(() => {
    // Check localStorage cache
    const cacheKey = 'portfolio-cache-skills';
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      try {
        const { technical, soft } = JSON.parse(cachedData);
        setTechnicalSkills(technical);
        setSoftSkills(soft);
        setIsCached(true);
        setLoading(false);
        return;
      } catch (e) {
        console.warn('[Portfolio] Failed to parse cached skills:', e);
      }
    }

    if (!db) {
      setError('Firebase not initialized');
      setLoading(false);
      return;
    }

    const fetchSkills = async () => {
      try {
        const collRef = collection(db, 'skills');
        const q = query(collRef, orderBy('order', 'asc'));
        const snapshot = await getDocs(q);

        const allSkills = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          } as Skill))
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

        const technical = allSkills.filter((s) => s.category === 'technical');
        const soft = allSkills.filter((s) => s.category === 'soft');

        setTechnicalSkills(technical);
        setSoftSkills(soft);
        setIsCached(false);

        // Cache results
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ technical, soft })
        );
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error';
        console.error('[Portfolio] Error fetching skills:', err);
        setError(`Failed to load skills: ${errorMessage}`);

        // Try cached fallback
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
          try {
            const { technical, soft } = JSON.parse(cachedData);
            setTechnicalSkills(technical);
            setSoftSkills(soft);
            setIsCached(true);
          } catch (e) {
            console.warn('[Portfolio] Cached skills also unavailable');
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return { technicalSkills, softSkills, loading, error, isCached };
}

/**
 * Hook to fetch projects from Firestore
 * @returns Projects data with loading and error states
 */
export function useProjects() {
  return useFirestoreCollection<Project>('projects', 'projects');
}
