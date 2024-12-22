/* eslint-disable @typescript-eslint/no-unsafe-function-type */

import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { AlsService } from '../als';
import { TimeTracker } from './interfaces';

@Injectable()
export class TrackingService {
  private readonly logger = new Logger();

  constructor(private readonly alsService: AlsService) {}

  get requestId(): string {
    return this.alsService.getStore()?.requestId ?? randomUUID();
  }

  time(label: string, context = this.constructor.name): TimeTracker {
    const start = process.hrtime.bigint();

    return {
      end: () => {
        const end = process.hrtime.bigint() - start;

        this.logger.debug(
          `${label} executed in ${Number(end / 1000000n)}ms`,
          context,
        );
      },
    };
  }

  label(...handlers: Function[]): string {
    return handlers
      .map(({ name }) => name)
      .join(':')
      .concat('-', this.requestId);
  }
}
