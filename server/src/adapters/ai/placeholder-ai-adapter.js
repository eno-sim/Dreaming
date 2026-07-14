const AIInterface = require('../../contracts/ai-interface');

class PlaceholderAIAdapter extends AIInterface {
  async reflectOnDream() {
    throw new Error('AI reflection is intentionally unavailable in Day 1');
  }
}

module.exports = PlaceholderAIAdapter;
