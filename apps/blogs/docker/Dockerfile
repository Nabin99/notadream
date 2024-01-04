FROM node:18-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /apps/notadream/

# Use a specific version of pnpm and set configurations
RUN npm install -g pnpm@8 \
    && pnpm config set store-dir .pnpm-store \
    && pnpm config set auto-install-peers false

# Copy package.json and pnpm files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN pnpm i 

# Copy app and library package.json files
COPY apps/blogs/package.json apps/blogs/
COPY libs/react/package.json libs/react/
COPY libs/backend/package.json libs/backend/

# Install dependencies for the workspace-specific packages
RUN pnpm install --filter ./apps/blogs/ && \
    pnpm install --filter ./libs/react/ && \
    pnpm install --filter ./libs/backend/

# 2. Rebuild the source code only when needed
FROM base AS builder
RUN npm install -g pnpm@8 \
    && pnpm config set store-dir .pnpm-store \
    && pnpm config set auto-install-peers false

WORKDIR /apps/notadream/

COPY --from=deps /apps/notadream/ ./

# Copy app and library source code
COPY apps/blogs apps/blogs
COPY libs/react libs/react
COPY libs/backend libs/backend


# Build the "blogs" app
RUN pnpm  --filter ./libs/backend/ build && \
    pnpm  --filter ./libs/react/ build && \
    pnpm  --filter ./apps/blogs/ build

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /apps/notadream/

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /apps/notadream/apps/blogs/public ./apps/blogs/public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /apps/notadream/apps/blogs/.next/standalone/ ./
COPY --from=builder --chown=nextjs:nodejs /apps/notadream/apps/blogs/.next/static ./apps/blogs/.next/static


USER nextjs

EXPOSE 4002

ENV PORT 4002
ENV HOSTNAME localhost

CMD ["node", "./apps/blogs/server.js"]
