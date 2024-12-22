import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import Redis from 'ioredis';
import { RateLimitConfig } from './interfaces';
import { RATE_LIMIT } from './rate-limit.constants';

@Global()
@Module({})
export class RateLimitCoreModule {
  static forRoot(config: RateLimitConfig): DynamicModule {
    const redis: Provider<Redis> = {
      provide: RATE_LIMIT,
      useFactory: () => new Redis(config),
    };

    return {
      module: RateLimitCoreModule,
      providers: [redis],
      exports: [redis],
    };
  }
}
