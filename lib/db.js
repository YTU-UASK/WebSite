const { MongoClient } = require('mongodb');

let cachedClient = null;

async function connectToDatabase() {
    if (cachedClient) {
        return cachedClient.db('uask');
    }

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    cachedClient = client;
    return client.db('uask');
}

module.exports = { connectToDatabase };
