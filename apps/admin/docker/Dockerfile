# Stage 1: Build stage
FROM node:18-alpine as build

# Use a specific version of pnpm and set configurations
RUN npm install -g pnpm@8 \
    && pnpm config set store-dir .pnpm-store \
    && pnpm config set auto-install-peers false

WORKDIR /apps/personal-web/

# Copy package.json and pnpm files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN pnpm i

# Copy app and library package.json files
COPY apps/admin/package.json apps/admin/
COPY libs/react-shared/package.json libs/react-shared/
COPY libs/utility-shared/package.json libs/utility-shared/

# Install dependencies for the workspace-specific packages
RUN pnpm install --filter ./apps/admin/ && \
    pnpm install --filter ./libs/react-shared/ && \
    pnpm install --filter ./libs/utility-shared/

# Copy app and library source code
COPY apps/admin apps/admin
COPY libs/react-shared libs/react-shared
COPY libs/utility-shared libs/utility-shared

# Build the "admin" app
RUN pnpm  --filter ./libs/utility-shared/ build && \
    pnpm  --filter ./libs/react-shared/ build && \
    pnpm  --filter ./apps/admin/ build

# Stage 2: Production stage
FROM nginx:1.23-alpine as production

# Copy nginx configuration
COPY apps/admin/docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built app from the build stage to the production image
COPY --from=build /apps/personal-web/apps/admin/dist /usr/share/nginx/html
