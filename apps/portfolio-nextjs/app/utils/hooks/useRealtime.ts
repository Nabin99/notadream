'use client';

/**
 * Real-time data sync hook using Firestore onSnapshot
 * Automatically updates component when data changes in Firestore
 */

import { useEffect, useState, useRef } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  Query,
  QueryConstraint,
  Unsubscribe,
} from 'firebase/firestore';
import { getAppConfig } from '@notadream/react';

interface RealtimeDataState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  isRealtime: boolean;
}

/**
 * Hook for real-time Firestore data sync
 * @param collectionName - Name of Firestore collection
 * @param enableRealtime - Enable real-time updates via onSnapshot (default: true)
 * @returns Object with data, loading, error states and realtime status
 */
export function useRealtimeCollection<T extends { id?: string; order?: number }>(
  collectionName: string,
  enableRealtime: boolean = true
): RealtimeDataState<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRealtime, setIsRealtime] = useState(false);
  const unsubscribeRef = useRef<Unsubscribe | null>(null);

  useEffect(() => {
    const db = getAppConfig().database?.firebase?.db;

    if (!db) {
      setError(
        'Firebase not initialized. Check NEXT_PUBLIC_FIREBASE_* environment variables.'
      );
      setLoading(false);
      return;
    }

    // Set up real-time listener
    const setupRealtime = async () => {
      try {
        const collRef = collection(db, collectionName);
        const q = query(
          collRef,
          orderBy('order', 'asc') as QueryConstraint
        );

        // Subscribe to real-time updates
        unsubscribeRef.current = onSnapshot(
          q,
          (snapshot) => {
            const items = snapshot.docs
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              } as T))
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

            setData(items);
            setError(null);
            setIsRealtime(true);
            setLoading(false);

            console.log(
              `[Realtime] ${collectionName} collection updated: ${items.length} items`
            );
          },
          (err) => {
            console.error(`[Realtime] Error listening to ${collectionName}:`, err);
            setError(`Failed to load ${collectionName} data`);
            setLoading(false);
          }
        );
      } catch (err) {
        console.error(`[Realtime] Setup error for ${collectionName}:`, err);
        setError(`Failed to setup real-time updates for ${collectionName}`);
        setLoading(false);
      }
    };

    if (enableRealtime) {
      setupRealtime();
    }

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [collectionName, enableRealtime]);

  return {
    data,
    loading,
    error,
    isRealtime,
  };
}

/**
 * Hook for monitoring multiple collections in real-time
 */
export function useRealtimePortfolioData() {
  const experience = useRealtimeCollection('experience');
  const education = useRealtimeCollection('education');
  const skills = useRealtimeCollection('skills');
  const projects = useRealtimeCollection('projects');

  const loading = [
    experience.loading,
    education.loading,
    skills.loading,
    projects.loading,
  ].some((l) => l);

  const error = [
    experience.error,
    education.error,
    skills.error,
    projects.error,
  ].find((e) => e);

  const isRealtime = [
    experience.isRealtime,
    education.isRealtime,
    skills.isRealtime,
    projects.isRealtime,
  ].every((r) => r);

  return {
    experience: experience.data,
    education: education.data,
    skills: skills.data,
    projects: projects.data,
    loading,
    error,
    isRealtime,
  };
}

/**
 * Hook for single document real-time updates
 */
export function useRealtimeDocument<T extends Record<string, any>>(
  collectionName: string,
  docId: string,
  enableRealtime: boolean = true
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const unsubscribeRef = useRef<Unsubscribe | null>(null);

  useEffect(() => {
    const db = getAppConfig().database?.firebase?.db;

    if (!db) {
      setError('Firebase not initialized');
      setLoading(false);
      return;
    }

    if (!enableRealtime) {
      setLoading(false);
      return;
    }

    try {
      const docRef = doc(db, collectionName, docId);

      unsubscribeRef.current = onSnapshot(
        docRef,
        (snapshot) => {
          if (snapshot.exists()) {
            setData({ id: snapshot.id, ...snapshot.data() } as T);
            setError(null);
          } else {
            setData(null);
            setError('Document not found');
          }
          setLoading(false);
        },
        (err) => {
          console.error(`[Realtime] Error listening to document:`, err);
          setError('Failed to load document');
          setLoading(false);
        }
      );
    } catch (err) {
      console.error(`[Realtime] Setup error:`, err);
      setError('Failed to setup real-time updates');
      setLoading(false);
    }

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [collectionName, docId, enableRealtime]);

  return { data, loading, error };
}

// Import doc at the top (adding it here for clarity)
import { doc } from 'firebase/firestore';
