import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { TrackingService } from '../tracking.service';

@Injectable()
export class MeasureExecutionTimeInterceptor implements NestInterceptor {
  constructor(private readonly trackingService: TrackingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const time = this.trackingService.time(
      this.trackingService.label(context.getHandler()),
      context.getClass().name,
    );

    return next.handle().pipe(tap(() => time.end()));
  }
}
