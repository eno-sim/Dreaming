const { z } = require('zod');

const DREAM_TYPES = ['SAMSARIC', 'CLARITY', 'CLEAR_LIGHT'];

const dreamSchema = z.object({
  timestamp: z.coerce.date().optional().default(() => new Date()),
  content: z.string().trim().min(1, 'Content is required'),
  is_lucid: z.boolean(),
  lucidity_level: z.number().int().min(1).max(5),
  dream_type: z.enum(DREAM_TYPES),
  themes: z.array(z.string().trim().min(1)).default([]),
  dream_signs: z.array(z.string().trim().min(1)).default([]),
  practice_notes: z.string().trim().default(''),
}).strict();

module.exports = { dreamSchema, DREAM_TYPES };
