import { Logger } from '@nestjs/common';
import { ReportMarkup, ReportValue } from './interfaces';
import { ReportPageData } from './worker';

/**
 * Фабрика страницы выгрузки
 */
export abstract class PageFactory<TData, TParams> {
  constructor(protected readonly logger: Logger) {}

  /**
   * Разметка страницы выгрузки
   */
  protected abstract markup(data: TData, params: TParams): ReportMarkup;

  /**
   * Название страницы выгрузки
   */
  protected abstract name(data: TData, params: TParams): string;

  /**
   * Заполнение данными страницы выгрузки
   */
  protected abstract value(data: TData, params: TParams): ReportValue[][];

  /**
   * Создание страницы выгрузки
   */
  build(data: TData, params: TParams): ReportPageData {
    return {
      markup: this.markup(data, params),
      name: this.name(data, params),
      value: this.value(data, params),
    };
  }
}
