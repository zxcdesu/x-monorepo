/* eslint-disable @typescript-eslint/no-explicit-any */

import { DynamicModule, Logger, Module, Type } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { ReportConfig } from './interfaces';
import { ReportCoreModule } from './report-core.module';
import { ReportFactory } from './report.factory';
import { ReportService } from './report.service';

@Module({})
export class ReportModule {
  static forRoot(config: ReportConfig): DynamicModule {
    return {
      module: ReportModule,
      imports: [ReportCoreModule.forRoot(config)],
    };
  }

  static forFeature(
    module: Type,
    reports: Type<ReportFactory<any, any>>[],
  ): DynamicModule {
    return {
      module: ReportModule,
      imports: [DiscoveryModule],
      providers: [
        ReportService,
        {
          provide: Logger,
          useValue: new Logger(module.name),
        },
        ...reports,
      ],
      exports: reports,
    };
  }
}
