import { Worker } from 'node:worker_threads';

export abstract class WorkerPool<TData, TResult> {
  private readonly workers: Worker[] = [];

  private readonly pointer = this.roundRobin();

  constructor(
    private readonly size: number,
    private readonly path: string,
  ) {
    Array.from(
      {
        length: this.size,
      },
      () => this.path,
    ).map(this.createWorker.bind(this));
  }

  abstract process(data: TData): Promise<TResult>;

  async terminate(): Promise<void> {
    await Promise.all(this.workers.map((worker) => worker.terminate()));
  }

  protected get worker(): Worker {
    const workerId = this.pointer.next().value;

    return this.workers[workerId];
  }

  private createWorker(path: string): void {
    this.workers.push(new Worker(path));
  }

  private *roundRobin(): Generator<number, never> {
    let pointer = 0;
    for (; true; ) {
      if (pointer === this.size) {
        pointer = 0;
      }

      yield pointer % this.size;
      pointer++;
    }
  }
}
