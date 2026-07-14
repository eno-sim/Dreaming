# Dreaming — Day 1 TODO

> Goal: ship a working, cozy dream-journal foundation today. Keep the implementation small, modular, and easy to extend tomorrow.

## 1. Workspace setup

- [x] Create `/server` and `/client`
- [x] Add root-level documentation and shared `.gitignore`
- [x] Add package scripts for backend and frontend
- [ ] Confirm the project runs locally with a clean install

## 2. Backend foundation

- [x] Initialize the Node.js/Express server
- [x] Add environment configuration for server port and SQLite path
- [x] Define `StorageInterface`
- [x] Implement `SQLiteAdapter`
- [x] Create the SQLite schema with `id`, `timestamp`, `content`, `is_lucid`, `lucidity_level`, `dream_type`, `themes`, `dream_signs`, and `practice_notes`
- [x] Serialize JSON fields only in the storage adapter and deserialize them on reads
- [x] Add API validation for dates, booleans, ranges, enum values, and arrays
- [x] Add `POST /api/dreams`, `GET /api/dreams`, and `GET /api/health`
- [x] Add consistent validation, not-found, and server-error responses
- [x] Keep routes independent from SQLite through dependency injection
- [x] Add empty `AIInterface` and `PlaceholderAIAdapter`; no AI logic

## 3. Frontend foundation

- [x] Initialize React with Vite
- [x] Configure Tailwind CSS
- [x] Add responsive app shell
- [x] Build distraction-free dream form
- [x] Add lucid toggle and 1–5 lucidity control
- [x] Add dream type, themes, dream signs, and practice notes
- [x] Submit the complete dream model
- [x] Build newest-first dream feed
- [x] Add loading, empty, success, and error states
- [x] Refresh the feed after saving

## 4. Cozy magical design

- [x] Add soft nighttime palette and typography
- [x] Add rounded cards, gentle shadows, gradients, and texture
- [x] Add subtle stars and restrained transitions
- [x] Keep the writing area calm and distraction-free
- [x] Add responsive layout and visible focus states
- [ ] Perform a final contrast/accessibility review in a browser

## 5. Verification and handoff

- [x] Add tests for valid dreams and complete model round-trip
- [x] Test lucidity bounds and dream-type validation
- [x] Test newest-first ordering
- [ ] Install dependencies and run backend tests
- [ ] Run production builds for backend and frontend
- [ ] Manually verify API-offline behavior in the frontend
- [x] Update `README.md` with setup, API, and model documentation
- [x] Record Day 2 AI adapter follow-up

## Definition of done for today

- A user can write a dream, mark it lucid, save it, and see it in the feed.
- Dream persistence works through `StorageInterface` and `SQLiteAdapter`.
- No AI logic is implemented, but its extension point is documented and ready.
- A fresh clone can be installed and run using the commands in `README.md`.
