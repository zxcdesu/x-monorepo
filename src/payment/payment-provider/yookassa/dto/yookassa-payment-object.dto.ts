import { Type } from 'class-transformer';
import {
  IsDateString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { YookassaPaymentAmountDto } from './yookassa-payment-amount.dto';

/**
 * Payment object
 *
 * @see https://yookassa.ru/developers/api#payment_object
 */
export class YookassaPaymentObjectDto {
  @IsString()
  id: string;

  @Type(() => YookassaPaymentAmountDto)
  @ValidateNested()
  amount: YookassaPaymentAmountDto;

  @Type(() => YookassaPaymentAmountDto)
  @IsOptional()
  @ValidateNested()
  income_amount?: YookassaPaymentAmountDto;

  @Type(() => YookassaPaymentAmountDto)
  @IsOptional()
  @ValidateNested()
  refunded_amount?: YookassaPaymentAmountDto;

  @IsDateString()
  created_at: string;
}
