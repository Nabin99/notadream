# 🎨 Portfolio (Vite)

NotADream Portfolio built with **Vite**, **React 19**, and **TypeScript**.

## 📋 Overview

The Vite-based portfolio is a high-performance, lightning-fast static portfolio website. It's optimized for speed and SEO, making it perfect for showcasing a developer's work and projects.

## 🛠️ Tech Stack

- **Build Tool**: Vite 6.4
- **UI Library**: React 19.0
- **Language**: TypeScript 5.6
- **Routing**: React Router DOM 7
- **Styling**: Tailwind CSS
- **Internationalization**: i18n
- **Package Manager**: pnpm 9.15.9
- **Server**: Nginx (production)

## 📦 Dependencies

### Core Dependencies
- `react`: ^19.0 - UI library
- `react-dom`: ^19.0 - React DOM rendering
- `react-router-dom`: ^7.0 - Client-side routing
- `vite`: ^6.4 - Build tool

### Libraries
- `@notadream/react`: - Shared React components, hooks, routing, i18n, theme engine

### Development Dependencies
- `typescript`: - Type-safe development
- `tailwindcss`: - Utility-first CSS
- `vite-plugin-compression`: - Asset compression
- `@vitejs/plugin-react`: - React plugin for Vite

## 🚀 Getting Started

### Prerequisites

- **Node.js**: >= 20.x
- **pnpm**: 9.15.9
- Configured from monorepo root

### Installation

Install dependencies from the monorepo root:

```bash
pnpm install
```

### Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Configure these variables:

```env
NODE_ENV=development
VITE_APP_NAME=NotADream Portfolio
VITE_APP_TITLE=Portfolio - Nabin Dhital
VITE_APP_DESCRIPTION=Full-stack developer portfolio
VITE_APP_KEYWORDS=portfolio, developer, full-stack
VITE_APP_LOGO=/logo.svg
VITE_API_BASE_URL=http://localhost:4000
VITE_APP_PORT=4003
VITE_APP_EMAIL=dhitalnabin224@gmail.com
VITE_I18N_DEFAULT_LANGUAGE=en
VITE_I18N_SUPPORTED_LANGUAGE=en,fr
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

### Development

Start the development server:

```bash
pnpm --filter @notadream/portfolio dev
```

Or from the monorepo root:

```bash
pnpm dev:portfolio
```

The portfolio will be available at `http://localhost:4003`

### Build

Build for production:

```bash
pnpm --filter @notadream/portfolio build
```

Output files will be in `dist/` directory.

### Preview

Preview the production build locally:

```bash
pnpm --filter @notadream/portfolio preview
```

## 📁 Project Structure

```
apps/portfolio/
├── src/
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   ├── config.ts            # Configuration
│   ├── Routes.tsx           # Route definitions
│   ├── routing-adapter.tsx  # Routing adapter
│   ├── components/          # Reusable components
│   ├── pages/               # Page components
│   ├── layouts/             # Layout components
│   ├── store/               # State management
│   ├── utils/               # Utility functions
│   ├── apis/                # API integrations
│   ├── i18n/                # Internationalization
│   ├── assets/              # Images, fonts, etc.
│   │   ├── css/             # Stylesheets
│   │   └── images/          # Images
│   └── vite-environment.d.ts
├── dist/                    # Compiled output (production)
├── docker/
│   ├── Dockerfile          # Docker configuration
│   └── nginx.conf          # Nginx configuration
├── public/                 # Static assets
│   ├── robots.txt          # SEO robots file
│   └── sitemap.xml         # SEO sitemap
├── package.json            # Dependencies
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

## 🐳 Docker

### Build Docker Image

```bash
docker build -f ./apps/portfolio/docker/Dockerfile -t notadream-portfolio:latest .
```

### Run Docker Container

```bash
docker run -p 4003:4003 notadream-portfolio:latest
```

### Using Docker Compose

```bash
# Start the portfolio service
docker-compose up portfolio

# Start all services
docker-compose up
```

The portfolio will be available at `http://localhost:4003`

## 🧪 Testing

Run unit tests:

```bash
pnpm --filter @notadream/portfolio test
```

Run tests in watch mode:

```bash
pnpm --filter @notadream/portfolio test:watch
```

## 📊 Features

- ✅ Lightning-fast Vite builds
- ✅ React 19 with hooks
- ✅ Type-safe with TypeScript
- ✅ Client-side routing with React Router
- ✅ Multi-language support (i18n)
- ✅ Responsive design with Tailwind CSS
- ✅ SEO optimized (robots.txt, sitemap.xml)
- ✅ Image optimization
- ✅ Gzip compression support
- ✅ Nginx for static serving
- ✅ Production-optimized build

## 🌍 Internationalization

The portfolio supports multiple languages:

```env
VITE_I18N_DEFAULT_LANGUAGE=en
VITE_I18N_SUPPORTED_LANGUAGE=en,fr
```

Language files are located in `src/i18n/`

## 📧 Contact Form

The portfolio includes a contact form powered by EmailJS. Configure:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## 🚨 Troubleshooting

### Port Already in Use

If port 4003 is already in use:

```bash
# Find and kill the process
lsof -i :4003
kill -9 <PID>

# Or use Docker with a different port
docker run -p 4004:4003 notadream-portfolio:latest
```

### Dependencies Not Found

Ensure all dependencies are installed:

```bash
pnpm install
pnpm --filter @notadream/portfolio install
```

### Build Fails

Clean and rebuild:

```bash
rm -rf dist/
pnpm --filter @notadream/portfolio build
```

### Vite Error

Clear Vite cache:

```bash
rm -rf node_modules/.vite
pnpm --filter @notadream/portfolio dev
```

### Environment Variables Not Loading

Ensure variable names start with `VITE_`:

```env
# ✅ Correct
VITE_APP_NAME=MyApp

# ❌ Incorrect
APP_NAME=MyApp
```

## 🔌 API Integration

The portfolio connects to the Fastify API service:

- **Default API URL**: `http://localhost:4000`
- **Configure via**: `.env` file (`VITE_API_BASE_URL`)

Ensure the API service is running before starting the portfolio.

## 📖 Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_APP_NAME` | App name | NotADream Portfolio |
| `VITE_APP_TITLE` | Page title | Portfolio - Nabin |
| `VITE_APP_DESCRIPTION` | Meta description | Full-stack developer |
| `VITE_API_BASE_URL` | API URL | http://localhost:4000 |
| `VITE_APP_PORT` | Server port | 4003 |
| `VITE_I18N_DEFAULT_LANGUAGE` | Default language | en |
| `VITE_I18N_SUPPORTED_LANGUAGE` | Supported languages | en,fr |

## 📚 Related Documentation

- [Docker Compose Guide](../../instructions/DOCKER_COMPOSE_GUIDE.md)
- [Docker Update Report](../../instructions/DOCKER_UPDATE_REPORT.md)
- [Main README](../../README.md)
- [React Library](../../../libs/react/README.md)
- [Portfolio NextJS](../portfolio-nextjs/README.md)

## 📄 License

UNLICENSED

## 👤 Author

Nabin Dhital
