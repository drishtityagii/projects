FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
RUN pnpm install
COPY . .
EXPOSE 3000
CMD ["pnpm","dev","-p","3000"]