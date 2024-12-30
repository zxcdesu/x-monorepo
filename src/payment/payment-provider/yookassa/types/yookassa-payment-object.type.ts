import { YookassaPaymentAmount } from './yookassa-payment-amount.type';

/**
 * Payment object
 *
 * @see https://yookassa.ru/developers/api#payment_object
 */
export interface YookassaPaymentObject {
  id: string;
  amount: YookassaPaymentAmount;
  income_amount?: YookassaPaymentAmount;
  refunded_amount?: YookassaPaymentAmount;
  created_at: string;
}
