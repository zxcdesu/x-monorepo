import { OmitType } from '@nestjs/mapped-types';
import { Exclude, Expose, Type } from 'class-transformer';
import { YookassaPaymentObjectDto } from './yookassa-payment-object.dto';
import { YookassaPendingPaymentConfirmationDto } from './yookassa-pending-payment-confirmation.dto';

@Exclude()
export class YookassaPendingPaymentDto extends OmitType(
  YookassaPaymentObjectDto,
  ['incomeAmount', 'refundedAmount'] as const,
) {
  @Expose()
  @Type(() => YookassaPendingPaymentConfirmationDto)
  confirmation: YookassaPendingPaymentConfirmationDto;
}
