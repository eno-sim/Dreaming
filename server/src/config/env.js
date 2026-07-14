const path = require('node:path');
require('dotenv').config();

module.exports = {
  port: Number(process.env.PORT || 3001),
  databasePath: path.resolve(process.cwd(), process.env.DATABASE_PATH || './data/dreaming.sqlite'),
};
