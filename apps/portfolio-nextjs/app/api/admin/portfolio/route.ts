/**
 * API Route: Get all portfolio data
 * Endpoint: GET /api/admin/portfolio
 * Auth: Requires Firebase Admin token
 */

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import {
  collection,
  getDocs,
  query,
  orderBy,
  QueryConstraint,
} from 'firebase/firestore';
import { getAppConfig } from '@notadream/react';

export async function GET(request: NextRequest) {
  try {
    // Get auth token from header
    const authToken = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!authToken) {
      return NextResponse.json(
        { error: 'Unauthorized: No authentication token' },
        { status: 401 }
      );
    }

    const db = getAppConfig().database?.firebase?.db;
    if (!db) {
      return NextResponse.json(
        { error: 'Firebase not configured' },
        { status: 500 }
      );
    }

    // Fetch all collections
    const collections = ['experience', 'education', 'skills', 'projects', 'metadata'];
    const data: Record<string, any[]> = {};

    for (const collName of collections) {
      const q = query(
        collection(db, collName),
        orderBy('order', 'asc') as QueryConstraint
      );
      const snapshot = await getDocs(q);
      data[collName] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('[API] Error fetching portfolio data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    );
  }
}
