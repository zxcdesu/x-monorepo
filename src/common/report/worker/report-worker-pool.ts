import { cpus } from 'node:os';
import { dirname, resolve } from 'node:path';
import { StreamWorkerPool } from '../../worker-pool';
import { ReportData } from './report-worker';

export class ReportWorkerPool extends StreamWorkerPool<ReportData> {
  constructor(size = cpus().length + 1) {
    super(size, resolve(dirname(__filename), 'report-worker.js'));
  }
}
