/**
 * API Route: Update portfolio item
 * Endpoint: PUT /api/admin/portfolio/[collection]/[id]
 * Auth: Requires Firebase Admin token
 */

import { NextRequest, NextResponse } from 'next/server';
import { doc, updateDoc } from 'firebase/firestore';
import { getAppConfig } from '@notadream/react';

interface RouteParams {
  params: {
    collection: string;
    id: string;
  };
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
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

    const { collection: collName, id } = params;
    const body = await request.json();

    // Update document
    const docRef = doc(db, collName, id);
    await updateDoc(docRef, {
      ...body,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: 'Document updated successfully', id },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] Error updating document:', error);
    return NextResponse.json(
      { error: 'Failed to update document' },
      { status: 500 }
    );
  }
}

/**
 * API Route: Delete portfolio item
 * Endpoint: DELETE /api/admin/portfolio/[collection]/[id]
 * Auth: Requires Firebase Admin token
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
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

    const { collection: collName, id } = params;

    // Delete document
    const docRef = doc(db, collName, id);
    await updateDoc(docRef, { deletedAt: new Date().toISOString() });

    return NextResponse.json(
      { message: 'Document deleted successfully', id },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] Error deleting document:', error);
    return NextResponse.json(
      { error: 'Failed to delete document' },
      { status: 500 }
    );
  }
}
