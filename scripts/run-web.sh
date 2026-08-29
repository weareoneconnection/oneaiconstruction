#!/usr/bin/env bash
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
if [ ! -d node_modules ]; then
  npm install
fi
if [ ! -f apps/web/.env.local ]; then
  cp apps/web/.env.example apps/web/.env.local
fi
npm run dev
