# Fusionexis

Simple Express + TypeScript backend using Postgres (Sequelize) and Redis (BullMQ).

## Requirements

- Node.js (recommended: 18+)
- Docker + Docker Compose

## Quick Start

1. Create env file

```bash
cp .env.example .env
```

2. Start Postgres + Redis

```bash
docker compose up -d
```

- Postgres runs on `localhost:5434`
- Redis runs on `localhost:6380`

3. Install dependencies

```bash
npm install
```

4. Run the API (dev)

```bash
npm run dev
```

API base URL: `http://localhost:8080`

## Environment Variables

These are read from `.env` via `dotenv` (see `src/config/env.ts`).

Required for API + DB:

- `DATABASE_URL` (example: `postgres://postgres:postgres@localhost:5434/fusionexis`)
- `JWT_SECRET`
- `REDIS_URL` (optional; defaults to `redis://127.0.0.1:6380`)
- `SSL` (optional; set to `true` if your Postgres requires SSL)

Email worker:

- `SMTP_EMAIL` / `SMTP_PASS`
  - If missing, the worker won’t start (the API will still run).

## Database & Auto-Sync

On startup the app authenticates to Postgres and runs `sequelize.sync()`.

- This project does not use migrations right now.
- If you change models, the schema updates depend on your sync settings in `src/config/db/connectPostgres.ts`.

## Seeding

Seed files:

- `src/config/db/seeds/users.json`
- `src/config/db/seeds/tasks.json`

Run seed:

```bash
npm run seed
```

This will:

- connect to Postgres using `DATABASE_URL`
- `sync()` the schema
- bulk insert users (passwords are hashed)
- bulk insert tasks

## API Routes

Users:

- `POST /api/users/register`
- `POST /api/users/login`
- `GET /api/users`
- `GET /api/users/:id`

Tasks:

- `POST /api/tasks` (auth required)
- `GET /api/tasks?page=1&limit=10`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id` (auth required)
- `DELETE /api/tasks/:id` (auth required)

REST client examples:

- `src/api/users.rest`
- `src/api/tasks.rest`

## Build & Run (production)

```bash
npm run build
npm start
```
