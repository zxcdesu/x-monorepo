import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ReportData, ReportWorkerPool } from './worker';

@Injectable()
export class ReportService implements OnModuleDestroy {
  constructor(private readonly workerPool: ReportWorkerPool) {}

  build(data: ReportData): Promise<ArrayBuffer> {
    return this.workerPool.process(data);
  }

  onModuleDestroy(): void {
    this.workerPool.terminate();
  }
}
