import { YookassaPaymentObjectDto } from '../dto/yookassa-payment-object.dto';
import { YookassaPendingPaymentConfirmationDto } from '../dto/yookassa-pending-payment-confirmation.dto';

export interface YookassaPendingPayment
  extends Omit<YookassaPaymentObjectDto, 'income_amount' | 'refunded_amount'> {
  confirmation: YookassaPendingPaymentConfirmationDto;
}
