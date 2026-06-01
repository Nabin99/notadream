# Chat API Dockerfile
# Multi-stage build for optimization

# Stage 1: Build
FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm@9.15.9

WORKDIR /app

# Copy workspace files
COPY pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/chat-api ./apps/chat-api
COPY libs/backend ./libs/backend
COPY package.json ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build chat-api
RUN cd apps/chat-api && pnpm run build

# Stage 2: Production
FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm@9.15.9

WORKDIR /app

# Copy package files
COPY --from=builder /app/apps/chat-api/package.json ./
COPY --from=builder /app/apps/chat-api/dist ./dist

# Install production dependencies only
RUN pnpm install --production --no-frozen-lockfile

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4001/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})" || exit 1

# Expose port
EXPOSE 4001

# Start server
CMD ["node", "dist/index.js"]
