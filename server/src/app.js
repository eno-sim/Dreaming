const express = require('express');
const cors = require('cors');
const createDreamRouter = require('./routes/dream-routes');
const errorHandler = require('./middleware/error-handler');

function createApp({ storage }) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok', service: 'dreaming-api' });
  });
  app.use('/api/dreams', createDreamRouter(storage));
  app.use((_request, response) => response.status(404).json({ error: 'Not found' }));
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
