Act as a senior software engineer and architect. We are building an AI-powered Dream Journal MVP with a strict 48-hour deadline. The architecture MUST be highly modular, using the Adapter Pattern for all external dependencies (Storage and AI) so we can easily swap them out later.

**Tech Stack for MVP:**
* Backend: Node.js with Express
* Database: SQLite
* Frontend: React (via Vite) and Tailwind CSS
* AI Interface: Placeholder (for Day 2)

**Your Current Task (Day 1 - The Foundation):**
1. Initialize the project workspace with a clear separation between the backend (`/server`) and frontend (`/client`).
2. **Backend**: Define a `StorageInterface` and implement an `SQLiteAdapter` that satisfies it (schema: id, timestamp, content, is_lucid). Build the API routes to save and fetch dreams.
3. **Frontend**: Build a distraction-free input form for logging dreams and a feed to view past entries. 
4. **Design Vibe**: Make the UI overwhelmingly cute, cozy, and magical. Use modern styling to achieve a soft, welcoming, and highly polished look. I will leave the specific colors, animations, and component designs to your best judgment to achieve this aesthetic.
5. Output the setup commands, the backend foundation code, and the React frontend code. Do NOT implement the AI logic yet; just leave an empty adapter/interface for tomorrow. Let's build!
