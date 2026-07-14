# Dreaming — Day 1 TODO

> Goal: ship a working, cozy dream-journal foundation today. Keep the implementation small, modular, and easy to extend tomorrow.

## 1. Workspace setup

- [ ] Create the root workspace structure:
  - [ ] `/server` — Express API and persistence adapters
  - [ ] `/client` — React/Vite UI
- [ ] Add root-level project documentation and shared `.gitignore`
- [ ] Add setup and run scripts for backend and frontend
- [ ] Confirm the project runs locally with a clean install

## 2. Backend foundation

- [ ] Initialize the Node.js/Express server
- [ ] Add environment configuration for the server port and SQLite database path
- [ ] Define the `StorageInterface` (the application-facing storage contract)
- [ ] Implement `SQLiteAdapter` behind that interface
- [ ] Create the SQLite schema:
  - [ ] `id` — database-generated primary key
  - [ ] `timestamp` — DateTime
  - [ ] `content` — Text
  - [ ] `is_lucid` — Boolean
  - [ ] `lucidity_level` — Integer, constrained to 1–5
  - [ ] `dream_type` — String enum: `SAMSARIC`, `CLARITY`, `CLEAR_LIGHT`
  - [ ] `themes` — Text containing a JSON array of keyword strings
  - [ ] `dream_signs` — Text containing a JSON array of strings
  - [ ] `practice_notes` — Text
- [ ] Add storage methods to create and list dreams
- [ ] Serialize `themes` and `dream_signs` arrays to JSON text in the SQLite adapter
- [ ] Deserialize `themes` and `dream_signs` back to arrays when reading dreams
- [ ] Add API validation for DateTime, Boolean, lucidity range, dream-type enum, and string arrays
- [ ] Add API routes:
  - [ ] `POST /api/dreams` — save a dream
  - [ ] `GET /api/dreams` — fetch dreams
- [ ] Add request validation and consistent error responses
- [ ] Add a health check endpoint
- [ ] Keep route handlers independent from SQLite by injecting the storage adapter
- [ ] Add an empty `AIInterface` and placeholder adapter for Day 2; do not implement AI behavior

## 3. Frontend foundation

- [ ] Initialize React with Vite
- [ ] Configure Tailwind CSS
- [ ] Add the app shell and responsive layout
- [ ] Build a distraction-free dream input form
- [ ] Add lucid-dream selection/toggle
- [ ] Add a lucidity-level control constrained to 1–5
- [ ] Add dream-type selection for `SAMSARIC`, `CLARITY`, and `CLEAR_LIGHT`
- [ ] Add optional themes, dream signs, and practice-notes fields
- [ ] Submit the complete dream model to the backend API
- [ ] Build a feed for previously logged dreams
- [ ] Add loading, empty, success, and error states
- [ ] Add refresh/update behavior after saving a dream

## 4. Cozy magical design

- [ ] Define a soft nighttime color palette and typography
- [ ] Add rounded cards, gentle shadows, gradients, and subtle texture
- [ ] Add small magical details and restrained animations
- [ ] Ensure the writing area remains calm and distraction-free
- [ ] Check mobile and desktop layouts
- [ ] Verify keyboard focus states and readable contrast

## 5. Verification and handoff

- [ ] Test creating a normal dream
- [ ] Test creating a lucid dream
- [ ] Test lucidity levels 1 and 5, and reject values outside 1–5
- [ ] Test each valid dream type and reject unknown types
- [ ] Test themes and dream signs round-trip as JSON arrays
- [ ] Test optional practice notes
- [ ] Test fetching an empty feed
- [ ] Test fetching multiple dreams and ordering them newest first
- [ ] Test invalid/empty input
- [ ] Verify the frontend handles an unavailable API gracefully
- [ ] Run the production build for both `/server` and `/client`
- [ ] Update `README.md` with final setup and usage instructions
- [ ] Record Day 2 follow-ups for the AI adapter and dream insights

## Definition of done for today

- A user can open the React app, write a dream, mark it lucid, save it, and see it in the feed.
- Dream persistence works through the `StorageInterface` and `SQLiteAdapter`.
- No AI logic is implemented yet, but its extension point is documented and ready.
- A fresh clone can be installed and run using the commands in `README.md`.
