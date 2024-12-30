import { PaymentProvider } from '@prisma/client';
import { YookassaOptions } from './yookassa';

export interface PaymentProviderOptions {
  [PaymentProvider.Yookassa]: YookassaOptions;
}
