ARG NODE_VERSION=22.20.0-slim
ARG PROJECT=api
ARG PORT=8000

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

WORKDIR /app
ENV CI=true
ENV HUSKY=0

# Copy lockfile and package.json's of isolated subworkspace
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/json/ .

# First install the dependencies (as they change less often)
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --frozen-lockfile

# Copy source code of isolated subworkspace
COPY --from=pruner /app/out/full/ .

RUN turbo build --filter=${PROJECT}
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm --filter=${PROJECT} deploy --prod --legacy /app/deployed

# Prepare the runtime image
FROM base AS runner
ARG PROJECT
ARG PORT

ENV NODE_ENV=production
ENV PORT=${PORT}

WORKDIR /app
COPY --from=builder /app/deployed/ .
COPY --from=builder /app/apps/${PROJECT}/dist ./dist

EXPOSE ${PORT}

CMD ["node", "dist/main.js"]