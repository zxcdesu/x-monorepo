import { YookassaPaymentObject } from './yookassa-payment-object.type';
import { YookassaPendingPaymentConfirmation } from './yookassa-pending-payment-confirmation.type';

export interface YookassaPendingPayment
  extends Omit<YookassaPaymentObject, 'income_amount' | 'refunded_amount'> {
  confirmation: YookassaPendingPaymentConfirmation;
}
