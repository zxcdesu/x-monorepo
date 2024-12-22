import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';
import { Store } from './interfaces';

@Injectable()
export class AlsService extends AsyncLocalStorage<Store> {}
