import { MessagePort } from 'node:worker_threads';

export interface StreamWorkerMessage<TData> {
  data: TData;
  producer: MessagePort;
}
