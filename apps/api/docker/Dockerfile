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
RUN pnpm i --frozen-lockfile

# Copy app and library package.json files
COPY apps/api/package.json apps/api/
COPY libs/utility-shared/package.json libs/utility-shared/

# Install dependencies for the workspace-specific packages
RUN pnpm install --filter ./apps/api/ && \
    pnpm install --filter ./libs/utility-shared/

# Copy app and library source code
COPY apps/api apps/api
COPY libs/utility-shared libs/utility-shared

# Build the "api" app
RUN pnpm  --filter ./libs/utility-shared/ build && \
    pnpm  --filter ./apps/api/ build

FROM build as production

COPY --from=build /apps/personal-web/apps/api/dist /apps/api/dist/

CMD ["node","index.js"]


