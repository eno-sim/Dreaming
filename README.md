# Dreaming

Dreaming is an AI-powered dream journal MVP: a quiet, cozy place to capture dreams before they fade. The first milestone focuses on dependable journaling and a polished foundation; AI-powered reflection will be added on Day 2.

## Project goals

- Make recording a dream fast, calm, and distraction-free.
- Persist dream entries locally with SQLite.
- Keep external dependencies behind adapters so they can be replaced without rewriting application logic.
- Leave a clear extension point for future AI analysis.

## MVP scope

### Day 1 — foundation

- React/Vite frontend with a cute, cozy, magical visual style
- Express backend
- SQLite persistence
- Create and list dream entries
- Lucid-dream flag
- Storage adapter contract and SQLite implementation
- Empty AI interface/adapter for tomorrow

### Day 2 — planned

- Connect an AI provider through the AI adapter
- Generate optional dream reflections, themes, or insights
- Add the minimum UI needed to display those insights

AI behavior is intentionally **not implemented yet**.

## Architecture

```text
/client (React + Vite + Tailwind)
          |
          | HTTP JSON API
          v
/server (Express routes/controllers)
          |
          | StorageInterface
          v
SQLiteAdapter  --->  SQLite database

Future:
Application services ---> AIInterface ---> AI adapter/provider
```

The API and application code depend on interfaces/contracts rather than concrete vendors. SQLite can therefore be replaced later with another storage adapter, and the future AI provider can be swapped without coupling it to the routes or React components.

## Data model

The initial `dreams` table contains:

| Column | Purpose |
| --- | --- |
| `id` | Unique dream identifier |
| `timestamp` | When the dream was recorded |
| `content` | The dream journal text |
| `is_lucid` | Whether the dream was lucid (`0`/`1` in SQLite) |

## Planned API

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Check that the API is running |
| `GET` | `/api/dreams` | Return saved dreams, newest first |
| `POST` | `/api/dreams` | Save a dream |

Example request:

```json
{
  "content": "I was floating through a library made of clouds.",
  "is_lucid": true
}
```

## Workspace layout

```text
Dreaming/
├── client/              # React/Vite/Tailwind frontend
├── server/              # Express API and adapters
├── README.md            # Project overview and setup
└── TODO.md              # Day 1 delivery checklist
```

## Setup

> The implementation files will be added as we work through `TODO.md`.

### Prerequisites

- Node.js 20+
- npm 10+

### Install

From the project root:

```bash
npm install --prefix server
npm install --prefix client
```

### Run in development

Start the backend in one terminal:

```bash
cd server
npm run dev
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

The Vite development server will print its local URL. The API will run on the configured server port (planned default: `3001`).

### Configuration

The backend will use environment variables for runtime configuration. Planned values:

```bash
PORT=3001
DATABASE_PATH=./data/dreaming.sqlite
```

Never commit secrets or local database files.

## Development principles

1. Keep route handlers thin and testable.
2. Inject adapters instead of importing concrete external dependencies throughout the app.
3. Validate data at the API boundary.
4. Prefer accessible, calm UI over unnecessary complexity.
5. Keep the Day 1 surface area small enough to finish reliably within the 48-hour MVP window.

## Status

**Day 1 — planning and workspace initialization**

See [`TODO.md`](./TODO.md) for the delivery checklist.
