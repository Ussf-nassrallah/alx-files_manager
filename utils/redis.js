/* Utility functions and helpers used across the project */
const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.clientConnected = true;

    this.client.on('error', (error) => {
      console.log(`Redis Error: ${error}`);
      this.clientConnected = false;
    });

    this.client.on('connect', () => {
      this.clientConnected = true;
    });
  }

  isAlive() {
    return this.clientConnected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, value) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(value);
        }
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', duration, (error) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (error) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}

export const redisClient = new RedisClient();
export default redisClient;
