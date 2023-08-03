# Stage 1: Build stage
FROM node:18-alpine as build

# Use a specific version of pnpm and set configurations
RUN npm install -g pnpm@8 \
    && pnpm config set store-dir .pnpm-store \
    && pnpm config set auto-install-peers false

WORKDIR /apps/portfolio/

# Copy package.json and pnpm files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN pnpm i --frozen-lockfile

# Copy app and library package.json files
COPY apps/portfolio/package.json apps/portfolio/
COPY libs/react-shared/package.json libs/react-shared/
COPY libs/utility-shared/package.json libs/utility-shared/

# Install dependencies for the workspace-specific packages
RUN pnpm install --filter ./apps/portfolio/ && \
    pnpm install --filter ./libs/react-shared/ && \
    pnpm install --filter ./libs/utility-shared/

# Copy app and library source code
COPY apps/portfolio apps/portfolio
COPY libs/react-shared libs/react-shared
COPY libs/utility-shared libs/utility-shared

# Build the "portfolio" app
RUN pnpm  --filter ./libs/utility-shared/ build && \
    pnpm  --filter ./libs/react-shared/ build && \
    pnpm  --filter ./apps/portfolio/ build

CMD ["pnpm","start"]


