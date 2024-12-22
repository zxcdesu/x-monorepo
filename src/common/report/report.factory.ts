import { Inject, Logger, Type } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { Report, ReportParams } from './interfaces';
import { PageFactory } from './page.factory';
import { ReportService } from './report.service';

export abstract class ReportFactory<
  TParams extends ReportParams = ReportParams,
  TData = unknown,
> {
  constructor(
    @Inject(Logger) protected readonly logger: Logger,
    @Inject(DiscoveryService)
    protected readonly discoveryService: DiscoveryService,
    @Inject(ReportService) private readonly reportService: ReportService,
  ) {}

  /**
   * Получение данных выгрузки
   */
  protected abstract data(params: TParams): Promise<TData>;

  /**
   * Название файла выгрузки
   */
  protected abstract name(params: TParams): Promise<string>;

  /**
   * Массив фабрик страниц выгрузки
   */
  protected abstract pages(): Type<PageFactory<TData, TParams>>[];

  /**
   * Создание выгрузки
   */
  async build(params: TParams): Promise<Report> {
    const [name, data] = await Promise.all([
      this.name(params),
      this.data(params),
    ]);

    const pages = this.pages().map((pageFactory) => {
      return new pageFactory(this.logger).build(data, params);
    });

    const report = await this.reportService.build({
      type: params.type,
      pages,
    });

    return {
      data: report,
      name,
    };
  }
}
