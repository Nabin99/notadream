"use client";

import { LoadingAnimation } from "./components";

/**
 * Loading component - Displayed while the page is loading
 * This is a Next.js special file that shows during Suspense boundaries
 */
export default function Loading() {
  return <LoadingAnimation />;
}
