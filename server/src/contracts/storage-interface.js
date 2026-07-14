class StorageInterface {
  async createDream(_dream) {
    throw new Error('StorageInterface.createDream must be implemented');
  }

  async listDreams() {
    throw new Error('StorageInterface.listDreams must be implemented');
  }
}

module.exports = StorageInterface;
