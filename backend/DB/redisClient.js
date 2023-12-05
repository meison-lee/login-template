// redisClient.js
const redis = require('redis');

let client;

async function connectRedis() {
  try {
    client = redis.createClient({
      // Add your Redis configuration here
      host: 'localhost',
      port: 6379
    });
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Error connecting to Redis:', err);
    throw err; // Rethrow or handle as needed
  }
}

connectRedis();

module.exports = {
  getClient: () => client,
};
