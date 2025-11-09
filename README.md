# gold

This repository contains the Gold project (backend + frontend). It includes:

- backend/ — Express + Prisma backend
- frontend/ — Next.js frontend
- docs/, docker/ and supporting scripts

Quick start

1. Backend

- cd backend
- cp .env.example .env (or create a `.env` file with your DATABASE_URL etc.)
- npm install
- npx prisma migrate dev  # apply migrations
- npm run dev or node src/server.js

2. Frontend

- cd frontend
- npm install
- npm run dev

Notes

- There are Prisma migrations under `backend/prisma/migrations` and a `RetailerGoldRate` migration.
- If you create a GitHub repo from this folder, see the notes below about nested repositories.

Contact

If you need help setting up the remote GitHub repo or splitting history, I can provide exact commands.
