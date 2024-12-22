import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { randomUUID } from 'node:crypto';
import { AlsModule, AlsService, Store } from '../als';
import { TrackingService } from './tracking.service';

@Module({
  imports: [AlsModule],
  providers: [TrackingService],
  exports: [TrackingService],
})
export class TrackingModule implements NestModule {
  constructor(private readonly alsService: AlsService) {}

  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        (
          req: FastifyRequest['raw'],
          reply: FastifyReply['raw'],
          next: () => void,
        ) => {
          const requestId = req.headers['x-request-id'] ?? randomUUID();

          if (typeof requestId === 'string') {
            const store: Store = {
              requestId,
            };

            return this.alsService.run(store, next);
          }

          return next();
        },
      )
      .forRoutes('*');
  }
}
