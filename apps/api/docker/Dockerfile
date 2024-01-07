# Stage 1: Build stage
FROM node:20-alpine as build

# Use a specific version of pnpm and set configurations
RUN npm install -g pnpm@8 \
    && pnpm config set store-dir .pnpm-store \
    && pnpm config set auto-install-peers false

WORKDIR /apps/notadream/

# Copy package.json and pnpm files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN pnpm i 

# Copy app and library package.json files
COPY apps/api/package.json apps/api/
COPY libs/backend/package.json libs/backend/

# Install dependencies for the workspace-specific packages
RUN pnpm install --filter ./apps/api/ && \
    pnpm install --filter ./libs/backend/

# Copy app and library source code
COPY apps/api apps/api
COPY libs/backend libs/backend

# Build the "api" app
RUN pnpm  --filter ./libs/backend/ build && \
    pnpm  --filter ./apps/api/ build

FROM build as production

COPY --from=build /apps/notadream/apps/api/dist /apps/api/dist/

CMD ["node","/apps/notadream/apps/api/dist/index.js"]


