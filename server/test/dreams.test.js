const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const createApp = require('../src/app');
const SQLiteAdapter = require('../src/adapters/storage/sqlite-adapter');

function setup() {
  const storage = new SQLiteAdapter(':memory:');
  return { app: createApp({ storage }), storage };
}

test('creates a complete dream and returns arrays at the API boundary', async () => {
  const { app, storage } = setup();
  const payload = { content: 'A cloud library.', is_lucid: true, lucidity_level: 4, dream_type: 'CLARITY', themes: ['flying', 'books'], dream_signs: ['impossible doors'], practice_notes: 'Reality check tomorrow.' };
  const response = await request(app).post('/api/dreams').send(payload);
  assert.equal(response.status, 201);
  assert.deepEqual(response.body.dream.themes, payload.themes);
  assert.deepEqual(response.body.dream.dream_signs, payload.dream_signs);
  assert.equal(response.body.dream.is_lucid, true);
  storage.close();
});

test('rejects invalid lucidity and dream type', async () => {
  const { app, storage } = setup();
  const response = await request(app).post('/api/dreams').send({ content: 'Nope', is_lucid: false, lucidity_level: 6, dream_type: 'UNKNOWN', themes: [], dream_signs: [], practice_notes: '' });
  assert.equal(response.status, 400);
  assert.ok(response.body.details.lucidity_level);
  assert.ok(response.body.details.dream_type);
  storage.close();
});

test('lists newest dreams first', async () => {
  const { app, storage } = setup();
  const base = { is_lucid: false, lucidity_level: 1, dream_type: 'SAMSARIC', themes: [], dream_signs: [], practice_notes: '' };
  await request(app).post('/api/dreams').send({ ...base, timestamp: '2026-07-13T10:00:00Z', content: 'Earlier' });
  await request(app).post('/api/dreams').send({ ...base, timestamp: '2026-07-14T10:00:00Z', content: 'Later' });
  const response = await request(app).get('/api/dreams');
  assert.deepEqual(response.body.dreams.map((dream) => dream.content), ['Later', 'Earlier']);
  storage.close();
});
