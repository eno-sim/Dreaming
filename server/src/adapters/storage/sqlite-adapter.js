const fs = require('node:fs');
const path = require('node:path');
const Database = require('better-sqlite3');
const StorageInterface = require('../../contracts/storage-interface');

class SQLiteAdapter extends StorageInterface {
  constructor(databasePath) {
    super();
    fs.mkdirSync(path.dirname(databasePath), { recursive: true });
    this.database = new Database(databasePath);
    this.database.pragma('journal_mode = WAL');
    this.database.exec(`
      CREATE TABLE IF NOT EXISTS dreams (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT NOT NULL,
        content TEXT NOT NULL,
        is_lucid INTEGER NOT NULL CHECK (is_lucid IN (0, 1)),
        lucidity_level INTEGER NOT NULL CHECK (lucidity_level BETWEEN 1 AND 5),
        dream_type TEXT NOT NULL CHECK (dream_type IN ('SAMSARIC', 'CLARITY', 'CLEAR_LIGHT')),
        themes TEXT NOT NULL DEFAULT '[]',
        dream_signs TEXT NOT NULL DEFAULT '[]',
        practice_notes TEXT NOT NULL DEFAULT ''
      );
      CREATE INDEX IF NOT EXISTS idx_dreams_timestamp ON dreams(timestamp DESC);
    `);
  }

  createDream(dream) {
    const statement = this.database.prepare(`
      INSERT INTO dreams
        (timestamp, content, is_lucid, lucidity_level, dream_type, themes, dream_signs, practice_notes)
      VALUES
        (@timestamp, @content, @is_lucid, @lucidity_level, @dream_type, @themes, @dream_signs, @practice_notes)
    `);

    const result = statement.run({
      timestamp: dream.timestamp.toISOString(),
      content: dream.content,
      is_lucid: dream.is_lucid ? 1 : 0,
      lucidity_level: dream.lucidity_level,
      dream_type: dream.dream_type,
      themes: JSON.stringify(dream.themes),
      dream_signs: JSON.stringify(dream.dream_signs),
      practice_notes: dream.practice_notes,
    });

    return this.findById(result.lastInsertRowid);
  }

  listDreams() {
    return this.database.prepare('SELECT * FROM dreams ORDER BY datetime(timestamp) DESC, id DESC').all().map((row) => this.toDream(row));
  }

  findById(id) {
    return this.toDream(this.database.prepare('SELECT * FROM dreams WHERE id = ?').get(id));
  }

  toDream(row) {
    if (!row) return null;
    return {
      id: row.id,
      timestamp: row.timestamp,
      content: row.content,
      is_lucid: Boolean(row.is_lucid),
      lucidity_level: row.lucidity_level,
      dream_type: row.dream_type,
      themes: JSON.parse(row.themes),
      dream_signs: JSON.parse(row.dream_signs),
      practice_notes: row.practice_notes,
    };
  }

  close() {
    this.database.close();
  }
}

module.exports = SQLiteAdapter;
