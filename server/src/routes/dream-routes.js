const express = require('express');
const { dreamSchema } = require('../validation/dream-schema');

function createDreamRouter(storage) {
  const router = express.Router();

  router.get('/', (_request, response) => {
    response.json({ dreams: storage.listDreams() });
  });

  router.post('/', (request, response) => {
    const parsed = dreamSchema.safeParse(request.body);
    if (!parsed.success) {
      return response.status(400).json({
        error: 'Please check the dream details and try again.',
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const dream = storage.createDream(parsed.data);
    return response.status(201).json({ dream });
  });

  return router;
}

module.exports = createDreamRouter;
