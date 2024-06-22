import Redis from 'ioredis';

class RedisServiceInstance {
  public client: Redis;

  constructor() {
    this.client = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
    // eslint-disable-next-line no-console
    this.client.on('error', (err) => console.error('Redis Client Error', err));
    // this.client.connect();
  }
}

const RedisService = new RedisServiceInstance();

export default RedisService;
