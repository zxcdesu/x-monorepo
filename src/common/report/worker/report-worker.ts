import { isMainThread, parentPort } from 'node:worker_threads';
import xlsx from 'xlsx';
import { StreamWorkerMessage } from '../../worker-pool';
import { ReportType } from '../enums';
import { ReportMarkup, ReportValue } from '../interfaces';

export interface ReportPageData {
  markup: ReportMarkup;
  name: string;
  value: ReportValue[][];
}

export interface ReportData {
  type: ReportType;
  pages: ReportPageData[];
}

const onMessage = (message: StreamWorkerMessage<ReportData>): void => {
  const workBook = xlsx.utils.book_new();

  for (const { name, value, markup } of message.data.pages) {
    const workSheet = xlsx.utils.aoa_to_sheet(value, {
      cellStyles: true,
    });

    workSheet['!cols'] = markup.cols;
    workSheet['!rows'] = markup.rows;

    xlsx.utils.book_append_sheet(workBook, workSheet, name);
  }

  const options: xlsx.WritingOptions = {
    type: 'array',
    bookType: message.data.type,
  };

  message.producer.postMessage(xlsx.write(workBook, options));
};

if (!isMainThread) {
  parentPort?.on('message', onMessage);
}
