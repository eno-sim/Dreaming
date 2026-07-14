Act as a senior software engineer and architect. We are building an AI-powered Dream Journal MVP with a strict 48-hour deadline. The architecture MUST be highly modular, using the Adapter Pattern for all external dependencies (Storage and AI) so we can easily swap them out later.

**Tech Stack for MVP:**
* Backend: Node.js with Express
* Database: SQLite
* Frontend: React (via Vite) and Tailwind CSS
* AI Interface: Placeholder (for Day 2)

**Your Current Task (Day 1 - The Foundation):**
1. Initialize the project workspace with a clear separation between the backend (`/server`) and frontend (`/client`).
2. **Backend**: Define a `StorageInterface` and implement an `SQLiteAdapter` that satisfies it. The `dreams` schema must include:
   - `id` (database-generated primary key)
   - `timestamp` (DateTime)
   - `content` (Text)
   - `is_lucid` (Boolean)
   - `lucidity_level` (Integer, 1–5)
   - `dream_type` (String enum: `SAMSARIC`, `CLARITY`, `CLEAR_LIGHT`)
   - `themes` (Text, stored as a JSON array of keyword strings)
   - `dream_signs` (Text, stored as a JSON array of strings)
   - `practice_notes` (Text)

   Build API routes to validate, save, and fetch dreams. Keep arrays as arrays at the API/application boundary and serialize them to JSON only in the storage adapter.
3. **Frontend**: Build a distraction-free input form for logging dreams and a feed to view past entries. The form must support the complete data model, including the lucid flag, lucidity level (1–5), dream type, themes, dream signs, and practice notes.
4. **Design Vibe**: Make the UI overwhelmingly cute, cozy, and magical. Use modern styling to achieve a soft, welcoming, and highly polished look. I will leave the specific colors, animations, and component designs to your best judgment to achieve this aesthetic.
5. Output the setup commands, the backend foundation code, and the React frontend code. Validate the new data model at the API boundary, use the Adapter Pattern for external dependencies, and do NOT implement AI logic yet; just leave an empty adapter/interface for tomorrow. Let's build!
