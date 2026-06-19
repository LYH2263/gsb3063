# syntax=docker/dockerfile:1
FROM node:20-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm config set registry https://registry.npmmirror.com \
    && npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY . .

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 8063
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
