const mongoose = require('mongoose');

module.exports = async (collectionName) => {
  try {
    // Check if the collection exists
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionExists = collections.some((collection) => collection.name === collectionName);

    if (collectionExists) {
      // Drop the collection
      await mongoose.connection.db.dropCollection(collectionName);
      console.log(`Dropped collection: ${collectionName}`);
    } else {
      console.log(`Collection not found: ${collectionName}`);
    }
  } catch (err) {
    throw err;
  }
}
