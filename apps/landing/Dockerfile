FROM node:22.14.0-slim AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml turbo.json ./

COPY apps/landing ./apps/landing

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --filter landing --frozen-lockfile

RUN pnpm run build --filter landing

FROM nginx:alpine
COPY --from=builder /app/apps/landing/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]