# Dreaming — Day 1 TODO
restore session: pi --session 019f5ffd-49c5-7850-a2b4-c24aae5c637f
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
  - [ ] `id`
  - [ ] `timestamp`
  - [ ] `content`
  - [ ] `is_lucid`
- [ ] Add storage methods to create and list dreams
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
- [ ] Submit dreams to the backend API
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
