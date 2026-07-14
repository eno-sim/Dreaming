# Dreaming

Dreaming is an AI-powered dream journal MVP: a quiet, cozy place to capture dreams before they fade. Day 1 focuses on dependable journaling and a polished foundation; AI-powered reflection is reserved for Day 2.

## MVP scope

- React/Vite/Tailwind frontend with a cute, cozy, magical visual style
- Express API with SQLite persistence
- Complete dream capture and newest-first feed
- Storage and future AI dependencies behind replaceable adapters
- Placeholder AI interface only — no AI behavior is implemented yet

## Architecture

```text
/client (React + Vite + Tailwind)
          |
          | HTTP JSON API
          v
/server (Express routes + validation)
          |
          | StorageInterface
          v
SQLiteAdapter  --->  SQLite database

Future: application services ---> AIInterface ---> provider adapter
```

Routes depend on `StorageInterface`, not on SQLite directly. `SQLiteAdapter` is responsible for database details and for converting `themes` and `dream_signs` between application arrays and SQLite JSON text. The future AI provider will follow the same Adapter Pattern.

## Data model

The `dreams` table contains the following fields. `id` is the database-generated primary key.

| Column | Type | Purpose |
| --- | --- | --- |
| `id` | Integer | Database-generated unique dream identifier |
| `timestamp` | DateTime | When the dream was recorded; stored as an ISO string in SQLite |
| `content` | Text | The dream journal text |
| `is_lucid` | Boolean | Whether the dream was lucid; stored as `0`/`1` in SQLite |
| `lucidity_level` | Integer | Whole number from 1 to 5 |
| `dream_type` | String | One of `SAMSARIC`, `CLARITY`, or `CLEAR_LIGHT` |
| `themes` | Text | JSON array of keyword strings in SQLite; array at the API boundary |
| `dream_signs` | Text | JSON array of strings in SQLite; array at the API boundary |
| `practice_notes` | Text | Optional notes about practice or follow-up reflection |

The API validates all fields. `content`, `is_lucid`, `lucidity_level`, `dream_type`, `themes`, and `dream_signs` are required; `timestamp` defaults to the current time and `practice_notes` defaults to an empty string.

## API

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Check that the API is running |
| `GET` | `/api/dreams` | Return saved dreams, newest first |
| `POST` | `/api/dreams` | Validate and save a dream |

Example request:

```json
{
  "timestamp": "2026-07-14T07:30:00.000Z",
  "content": "I was floating through a library made of clouds.",
  "is_lucid": true,
  "lucidity_level": 4,
  "dream_type": "CLARITY",
  "themes": ["flying", "library", "wonder"],
  "dream_signs": ["impossible architecture"],
  "practice_notes": "Notice impossible rooms during tomorrow's reality checks."
}
```

The response keeps `themes` and `dream_signs` as JSON arrays. Invalid dates, booleans, lucidity levels outside 1–5, unknown dream types, empty content, or non-string array entries return `400`.

## Workspace layout

```text
Dreaming/
├── client/              # React/Vite/Tailwind frontend
├── server/              # Express API, validation, contracts, and adapters
├── README.md
├── TODO.md
└── .gitignore
```

## Setup

### Prerequisites

- Node.js 20+
- npm 9+

### Install

From the project root:

```bash
npm install --prefix server
npm install --prefix client
```

### Run in development

Terminal 1 — backend:

```bash
cd server
npm run dev
```

Terminal 2 — frontend:

```bash
cd client
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`. The frontend proxies `/api` to the backend at `http://localhost:3001`.

### Environment

Copy `server/.env.example` if you want to customize the defaults:

```bash
PORT=3001
DATABASE_PATH=./data/dreaming.sqlite
```

Local databases, environment files, dependencies, and build artifacts are ignored by Git.

## Verification

```bash
cd server && npm test
cd ../client && npm run build
```

## Day 2

Connect a real AI provider through `AIInterface` and an AI adapter. Do not couple provider SDK calls to routes, storage, or React components.
