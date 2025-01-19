import { PaymentAdapter } from '@prisma/client';
import { YookassaOptions } from './yookassa';

export interface PaymentAdapterOptions {
  [PaymentAdapter.Yookassa]: YookassaOptions;
}
