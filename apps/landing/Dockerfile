ARG NODE_VERSION=22.20.0-slim
ARG PROJECT=landing
ARG MODE=production
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

WORKDIR /app

# Copy lockfile and package.json's of isolated subworkspace
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/json/ .

# First install the dependencies (as they change less often)
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --frozen-lockfile

# Copy source code of isolated subworkspace
COPY --from=pruner /app/out/full/ .

ARG MODE
RUN PORT=${PORT} turbo build --filter=${PROJECT} -- --mode ${MODE}
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store CI=true pnpm prune --prod --no-optional --ignore-scripts
RUN rm -rf ./**/*/src

# Serve the build output
FROM base AS runner
ARG PROJECT
WORKDIR /app

COPY --from=builder /app/apps/${PROJECT}/.output ./.output

ARG PORT
ENV PORT=${PORT}

EXPOSE ${PORT}

CMD ["node", ".output/server/index.mjs"]