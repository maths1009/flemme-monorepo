ARG NODE_VERSION=22.20.0-slim
ARG PROJECT=web
ARG PORT=3000

FROM node:${NODE_VERSION} AS slim

# Setup pnpm and turbo on the alpine base
FROM slim AS base
RUN npm install pnpm turbo --global
RUN pnpm config set store-dir ~/.pnpm-store

# Prune projects
FROM base AS pruner
ARG PROJECT

WORKDIR /app
COPY . .
RUN turbo prune --scope=${PROJECT} --docker

# Build the project
FROM base AS builder
ARG PROJECT
ARG PORT
ENV PORT=${PORT}
ENV NODE_OPTIONS="--max-old-space-size=2048"

WORKDIR /app

# Copy lockfile and package.json's of isolated subworkspace
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/json/ .

# First install the dependencies (as they change less often)
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --frozen-lockfile

# Copy source code of isolated subworkspace
COPY --from=pruner /app/out/full/ .

RUN turbo build --filter=${PROJECT}
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store CI=true pnpm prune --prod --no-optional --ignore-scripts
RUN rm -rf ./**/*/src

# Serve the build output using the Next.js standalone mode
FROM node:${NODE_VERSION} AS runner
ARG PROJECT
ARG PORT
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=${PORT}
ENV HOSTNAME="0.0.0.0"

# Copy the standalone build, static files and public directory
COPY --from=builder /app/apps/${PROJECT}/.next/standalone ./
COPY --from=builder /app/apps/${PROJECT}/.next/static ./apps/${PROJECT}/.next/static
COPY --from=builder /app/apps/${PROJECT}/public ./apps/${PROJECT}/public

EXPOSE ${PORT}

CMD ["node", "apps/web/server.js"]
