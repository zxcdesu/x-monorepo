import xlsx from 'xlsx';

export interface ReportMarkup {
  cols?: xlsx.ColInfo[];
  rows?: xlsx.RowInfo[];
}
