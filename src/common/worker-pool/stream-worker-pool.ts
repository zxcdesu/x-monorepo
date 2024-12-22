import { MessageChannel } from 'node:worker_threads';
import { StreamWorkerMessage } from './interfaces';
import { WorkerPool } from './worker-pool';

export class StreamWorkerPool<T> extends WorkerPool<T, ArrayBuffer> {
  process(data: T): Promise<ArrayBuffer> {
    const messageChannel = new MessageChannel();
    const consumer = messageChannel.port1;
    const producer = messageChannel.port2;

    const message: StreamWorkerMessage<T> = {
      data,
      producer,
    };

    this.worker.postMessage(message, [producer]);

    return new Promise((resolve, reject) => {
      consumer.on('message', resolve);
      consumer.on('messageerror', reject);
    });
  }
}
