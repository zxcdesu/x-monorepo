import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { ReportConfig } from './interfaces';
import { ReportWorkerPool } from './worker';

@Global()
@Module({})
export class ReportCoreModule {
  static forRoot(config: ReportConfig): DynamicModule {
    const reportWorkerPool: Provider<ReportWorkerPool> = {
      provide: ReportWorkerPool,
      useValue: new ReportWorkerPool(config.threads),
    };

    return {
      module: ReportCoreModule,
      providers: [reportWorkerPool],
      exports: [reportWorkerPool],
    };
  }
}
