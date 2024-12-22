import { Inject, Injectable } from '@nestjs/common';
import type Redis from 'ioredis';
import { RATE_LIMIT } from './rate-limit.constants';

@Injectable()
export class RateLimitService {
  constructor(@Inject(RATE_LIMIT) private readonly redis: Redis) {}

  async isLimitExceeded(
    userId: string,
    url: string,
    limit: number,
  ): Promise<boolean> {
    const value = Number(await this.redis.get(this.key(userId, url)));

    if (Number.isNaN(value)) {
      return false;
    }

    return value >= limit;
  }

  async increase(userId: string, url: string, value = 1): Promise<void> {
    const key = this.key(userId, url);
    const date = new Date();

    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0);

    await this.redis.incrby(key, value);
    await this.redis.expireat(key, Math.round(date.getTime() / 1000));
  }

  private key(userId: string, url: string): string {
    return url.split('/').slice(1).concat(userId).join(':');
  }
}
