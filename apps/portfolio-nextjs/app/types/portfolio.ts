// TypeScript interfaces for Portfolio data from Firestore

/**
 * Experience document structure
 * Collection: /experience
 * Documents represent individual job/role positions
 */
export interface Experience {
  id?: string; // Firestore document ID
  role: string; // Job title (e.g., "Software Developer")
  company: string; // Company name
  start: string; // Start date (e.g., "Apr 2024")
  end: string; // End date (e.g., "Present")
  description: string[]; // Array of bullet points
  order: number; // Sort order in the list
  timestamp?: number; // Firebase server timestamp
}

/**
 * Education document structure
 * Collection: /education
 * Documents represent degrees/certifications
 */
export interface Education {
  id?: string; // Firestore document ID
  title: string; // Degree title (e.g., "Bachelor of Science in Computer Science")
  degree: string; // Degree type (e.g., "Bachelor's Degree")
  institution: string; // School/University name
  start: string; // Start date
  end: string; // End/expected graduation date
  description: string; // Program description
  order: number; // Sort order in the list
  timestamp?: number; // Firebase server timestamp
}

/**
 * Skill document structure
 * Collection: /skills
 * Documents represent individual skills (technical or soft)
 */
export interface Skill {
  id?: string; // Firestore document ID
  name: string; // Skill name (e.g., "React.js", "Communication")
  category: 'technical' | 'soft'; // Category: technical or soft skill
  order: number; // Sort order in the list
  timestamp?: number; // Firebase server timestamp
}

/**
 * Project document structure
 * Collection: /projects
 * Documents represent portfolio projects
 */
export interface Project {
  id?: string; // Firestore document ID
  name: string; // Project name
  description: string; // Project description
  site: string; // Project URL
  order: number; // Sort order in the list
  featured?: boolean; // Whether to feature this project
  timestamp?: number; // Firebase server timestamp
}

/**
 * Contact form submission structure
 * Collection: /submissions
 * Documents are created when users submit the contact form
 */
export interface ContactSubmission {
  id?: string; // Firestore document ID
  name: string; // Submitter name
  email: string; // Submitter email
  message: string; // Contact message
  timestamp?: number; // Submission timestamp (Firebase server time)
  read?: boolean; // Whether the submission has been read by admin
  archived?: boolean; // Whether archived
}

/**
 * App metadata structure
 * Collection: /metadata
 * Documents store app-level settings and information
 */
export interface AppMetadata {
  id?: string; // Firestore document ID
  lastUpdated?: number; // Last time portfolio data was updated
  version?: string; // Version of portfolio data schema
  settings?: {
    maintenanceMode?: boolean; // Whether app is in maintenance mode
    [key: string]: any; // Flexible for future settings
  };
}

/**
 * Cache structure for in-memory data
 * Used by React Context to prevent redundant Firestore queries
 */
export interface PortfolioCache {
  experience: Experience[] | null;
  education: Education[] | null;
  skills: Skill[] | null;
  projects: Project[] | null;
  loading: boolean;
  error: string | null;
  lastFetched: number; // Timestamp of last fetch
}
