# Stage 1: Build stage
FROM node:20-alpine as build

# Use a specific version of pnpm and set configurations
RUN npm install -g pnpm@9.15.9 \
    && pnpm config set store-dir .pnpm-store \
    && pnpm config set auto-install-peers true

WORKDIR /apps/notadream/

# Copy package.json and pnpm files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN pnpm i 

# Copy app and library package.json files
COPY apps/api/package.json apps/api/
COPY libs/backend/package.json libs/backend/

# Install dependencies for the workspace-specific packages
RUN pnpm  --filter ./apps/api/ install && \
    pnpm  --filter ./libs/backend/ install

# Copy app and library source code
COPY apps/api apps/api
COPY libs/backend libs/backend

# Build the "api" app
RUN pnpm  --filter ./libs/backend/ build && \
    pnpm  --filter ./apps/api/ build

# Stage 2: Production stage
FROM node:20-alpine as production

# Install pnpm
RUN npm install -g pnpm@9.15.9

WORKDIR /apps/notadream/

# Copy package.json for production
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/
COPY libs/backend/package.json libs/backend/

# Install production dependencies only
RUN pnpm i --prod --ignore-scripts

# Copy built application
COPY --from=build /apps/notadream/apps/api/dist ./apps/api/dist/

# Set environment
ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

CMD ["node", "apps/api/dist/index.js"]


