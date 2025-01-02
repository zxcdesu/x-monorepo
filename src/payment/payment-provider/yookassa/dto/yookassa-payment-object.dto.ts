import { Exclude, Expose, Type } from 'class-transformer';
import { YookassaPaymentAmountDto } from './yookassa-payment-amount.dto';

/**
 * Payment object
 *
 * @see https://yookassa.ru/developers/api#payment_object
 */
@Exclude()
export class YookassaPaymentObjectDto {
  @Expose()
  id: string;

  @Expose()
  @Type(() => YookassaPaymentAmountDto)
  amount: YookassaPaymentAmountDto;

  @Expose({ name: 'income_amount' })
  @Type(() => YookassaPaymentAmountDto)
  incomeAmount?: YookassaPaymentAmountDto;

  @Expose({ name: 'refunded_amount' })
  @Type(() => YookassaPaymentAmountDto)
  refundedAmount?: YookassaPaymentAmountDto;

  @Expose({ name: 'created_at' })
  createdAt: string;
}
