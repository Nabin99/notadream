# Stage 1: Build stage
FROM node:20-alpine as build

# Use a specific version of pnpm and set configurations
RUN npm install -g pnpm@8 \
    && pnpm config set store-dir .pnpm-store \
    && pnpm config set auto-install-peers true

WORKDIR /apps/nepalex-admin/

# Copy package.json and pnpm files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN pnpm i

# Copy app and library package.json files
COPY apps/nepalex-admin/package.json apps/nepalex-admin/
COPY libs/react/package.json libs/react/

# Install dependencies for the workspace-specific packages
RUN pnpm --filter ./apps/nepalex-admin/ install && \
    pnpm --filter ./libs/react/ install

# Copy app and library source code
COPY apps/nepalex-admin apps/nepalex-admin
COPY libs/react libs/react

# Build the "nepalex-admin" app
RUN pnpm --filter ./libs/react/ build && \
    pnpm --filter ./apps/nepalex-admin/ build

# Stage 2: Production stage
FROM nginx:1.23-alpine as production

# Copy nginx configuration
COPY apps/nepalex-admin/docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built app from the build stage to the production image
COPY --from=build /apps/notadream/apps/nepalex-admin/dist /usr/share/nginx/html

EXPOSE 4003
