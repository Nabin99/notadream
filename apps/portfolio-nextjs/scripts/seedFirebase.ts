/**
 * Firebase Seed Data Script
 * Uploads initial portfolio data to Firestore
 * Usage: npx tsx scripts/seedFirebase.ts
 */

import * as admin from 'firebase-admin';
import * as path from 'path';

// Initialize Firebase Admin SDK
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
if (!serviceAccountPath) {
  console.error(
    'Error: FIREBASE_SERVICE_ACCOUNT_KEY environment variable not set.\n' +
    'Download your service account key from Firebase Console > Project Settings > Service Accounts > Generate new private key\n' +
    'Set the path: export FIREBASE_SERVICE_ACCOUNT_KEY="/path/to/service-account-key.json"'
  );
  process.exit(1);
}

const serviceAccount = require(path.resolve(serviceAccountPath));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Seed data
const experienceData = [
  {
    order: 1,
    company: 'Tech Startup Inc',
    role: 'Senior Full-Stack Developer',
    start: '2022-01',
    end: 'Present',
    description: [
      'Built scalable microservices architecture with Node.js and TypeScript',
      'Led frontend team for React and Next.js projects',
      'Mentored junior developers on best practices',
      'Reduced API response time by 40% through optimization',
    ],
  },
  {
    order: 2,
    company: 'Digital Agency Co',
    role: 'Full-Stack Developer',
    start: '2020-06',
    end: '2021-12',
    description: [
      'Developed and maintained 15+ web applications',
      'Collaborated with designers and product managers',
      'Implemented CI/CD pipelines with GitHub Actions',
      'Mentored 3 junior developers',
    ],
  },
  {
    order: 3,
    company: 'Freelance',
    role: 'Web Developer',
    start: '2019-01',
    end: '2020-05',
    description: [
      'Created custom WordPress themes and plugins',
      'Built React SPAs for clients',
      'Managed projects from requirements to deployment',
      'Maintained 20+ client websites',
    ],
  },
];

const educationData = [
  {
    order: 1,
    school: 'University of Technology',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    year: 2019,
    description: 'Graduated with honors. Focus on web development and software engineering.',
  },
  {
    order: 2,
    school: 'Online Learning Platform',
    degree: 'Professional Certificate',
    field: 'Full-Stack Web Development',
    year: 2018,
    description: 'Completed intensive bootcamp covering MERN stack and best practices.',
  },
];

const skillsData = [
  // Technical Skills
  { order: 1, name: 'TypeScript', category: 'technical' },
  { order: 2, name: 'JavaScript', category: 'technical' },
  { order: 3, name: 'React', category: 'technical' },
  { order: 4, name: 'Next.js', category: 'technical' },
  { order: 5, name: 'Node.js', category: 'technical' },
  { order: 6, name: 'Express.js', category: 'technical' },
  { order: 7, name: 'MongoDB', category: 'technical' },
  { order: 8, name: 'PostgreSQL', category: 'technical' },
  { order: 9, name: 'Firestore', category: 'technical' },
  { order: 10, name: 'Tailwind CSS', category: 'technical' },
  { order: 11, name: 'GraphQL', category: 'technical' },
  { order: 12, name: 'Docker', category: 'technical' },
  { order: 13, name: 'Git', category: 'technical' },
  { order: 14, name: 'REST APIs', category: 'technical' },
  { order: 15, name: 'AWS', category: 'technical' },
  // Soft Skills
  { order: 1, name: 'Leadership', category: 'soft' },
  { order: 2, name: 'Communication', category: 'soft' },
  { order: 3, name: 'Problem Solving', category: 'soft' },
  { order: 4, name: 'Team Collaboration', category: 'soft' },
  { order: 5, name: 'Project Management', category: 'soft' },
  { order: 6, name: 'Agile/Scrum', category: 'soft' },
];

const projectsData = [
  {
    order: 1,
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce application with real-time inventory management',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: 'https://github.com/yourusername/ecommerce',
    featured: true,
  },
  {
    order: 2,
    title: 'Blog Platform',
    description: 'Multi-author blogging platform with markdown support and SEO optimization',
    technologies: ['Next.js', 'PostgreSQL', 'Tailwind CSS'],
    link: 'https://github.com/yourusername/blog-platform',
    featured: true,
  },
  {
    order: 3,
    title: 'Dashboard Analytics',
    description: 'Real-time analytics dashboard with data visualization',
    technologies: ['React', 'TypeScript', 'Chart.js', 'GraphQL'],
    link: 'https://github.com/yourusername/analytics-dashboard',
    featured: true,
  },
  {
    order: 4,
    title: 'Chat Application',
    description: 'Real-time messaging app with user authentication and notifications',
    technologies: ['React', 'Firebase', 'WebSocket'],
    link: 'https://github.com/yourusername/chat-app',
    featured: false,
  },
  {
    order: 5,
    title: 'Weather App',
    description: 'Weather application with location-based forecasting',
    technologies: ['React', 'API Integration', 'Geolocation'],
    link: 'https://github.com/yourusername/weather-app',
    featured: false,
  },
];

const metadataData = {
  lastUpdated: new Date().toISOString(),
  version: '1.0',
  dataSource: 'Seed Script',
};

async function seedDatabase() {
  try {
    console.log('🌱 Starting Firestore seed...\n');

    // Seed Experience
    console.log('📝 Seeding experience collection...');
    for (const exp of experienceData) {
      await db.collection('experience').add(exp);
    }
    console.log(`✅ Added ${experienceData.length} experience entries\n`);

    // Seed Education
    console.log('🎓 Seeding education collection...');
    for (const edu of educationData) {
      await db.collection('education').add(edu);
    }
    console.log(`✅ Added ${educationData.length} education entries\n`);

    // Seed Skills
    console.log('🛠️  Seeding skills collection...');
    for (const skill of skillsData) {
      await db.collection('skills').add(skill);
    }
    console.log(`✅ Added ${skillsData.length} skill entries\n`);

    // Seed Projects
    console.log('🚀 Seeding projects collection...');
    for (const project of projectsData) {
      await db.collection('projects').add(project);
    }
    console.log(`✅ Added ${projectsData.length} project entries\n`);

    // Seed Metadata
    console.log('⚙️  Seeding metadata collection...');
    await db.collection('metadata').doc('portfolio').set(metadataData);
    console.log('✅ Metadata seeded\n');

    console.log('🎉 Firestore seed completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Update experience, education, skills, and projects data as needed');
    console.log('2. Test the portfolio app to ensure data loads correctly');
    console.log('3. Configure Firestore security rules');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding Firestore:', error);
    process.exit(1);
  }
}

seedDatabase();
