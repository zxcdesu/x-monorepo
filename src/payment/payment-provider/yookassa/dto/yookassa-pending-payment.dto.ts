import { OmitType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { YookassaPaymentObjectDto } from './yookassa-payment-object.dto';
import { YookassaPendingPaymentConfirmationDto } from './yookassa-pending-payment-confirmation.dto';

export class YookassaPendingPaymentDto extends OmitType(
  YookassaPaymentObjectDto,
  ['income_amount', 'refunded_amount'] as const,
) {
  @Type(() => YookassaPendingPaymentConfirmationDto)
  @ValidateNested()
  confirmation: YookassaPendingPaymentConfirmationDto;
}
