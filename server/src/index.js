const config = require('./config/env');
const createApp = require('./app');
const SQLiteAdapter = require('./adapters/storage/sqlite-adapter');

const storage = new SQLiteAdapter(config.databasePath);
const app = createApp({ storage });
const server = app.listen(config.port, () => {
  console.log(`Dreaming API listening on http://localhost:${config.port}`);
});

function shutdown() {
  server.close(() => {
    storage.close();
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
