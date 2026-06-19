#!/bin/sh
set -e

# 仅同步 schema，镜像构建阶段已 generate，跳过重复 generate
npx prisma db push --accept-data-loss --skip-generate

# 种子数据只执行一次，避免每次重启都等待 seed
if [ ! -f /app/.data/.seeded ]; then
  npm run prisma:seed
  mkdir -p /app/.data
  touch /app/.data/.seeded
fi

exec npx tsx src/index.ts
