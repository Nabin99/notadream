# Stage 1: Build stage
FROM node:20-alpine as build

# Use a specific version of pnpm and set configurations
RUN npm install -g pnpm@7.21.1 \
    && pnpm config set store-dir .pnpm-store \
    && pnpm config set auto-install-peers true

WORKDIR /apps/notadream/

# Copy package.json and pnpm files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN pnpm i 

# Copy app and library package.json files
COPY apps/admin/package.json apps/admin/
COPY libs/react/package.json libs/react/

# Install dependencies for the workspace-specific packages
RUN pnpm  --filter ./apps/admin/ install && \
    pnpm  --filter ./libs/react/ install

# Copy app and library source code
COPY apps/admin apps/admin
COPY libs/react libs/react

# Build the "admin" app
RUN  pnpm  --filter ./libs/react/ build && \
    pnpm  --filter ./apps/admin/ build

# Stage 2: Production stage
FROM nginx:1.23-alpine as production

# Copy nginx configuration
COPY apps/admin/docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built app from the build stage to the production image
COPY --from=build /apps/notadream/apps/admin/dist /usr/share/nginx/html

EXPOSE 4001
