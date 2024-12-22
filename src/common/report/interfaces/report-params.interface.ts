import { ReportType } from '../enums';

export interface ReportParams<TArgs = unknown> {
  type: ReportType;
  args: TArgs;
}
