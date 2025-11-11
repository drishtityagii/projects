# apps/web/Dockerfile
FROM node:20-alpine

# Work in /app (repo root inside container)
WORKDIR /app

# Copy root workspace files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

# Copy package.json for all workspaces (fast install without source yet)
# If you have many packages, you can copy just their package.json files to leverage caching
COPY packages ./packages
COPY apps/web/package.json ./apps/web/package.json

# Enable pnpm and install deps for the monorepo
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
RUN pnpm install --frozen-lockfile

# Copy the web app source (will be overridden by bind mount in dev)
COPY apps/web ./apps/web

# Default working dir: web app
WORKDIR /app/apps/web
EXPOSE 3000

# Dev server
CMD ["pnpm", "dev", "-p", "3000"]
