import xlsx from 'xlsx';

export type ReportValue =
  | string
  | number
  | boolean
  | xlsx.CellObject
  | null
  | undefined;
