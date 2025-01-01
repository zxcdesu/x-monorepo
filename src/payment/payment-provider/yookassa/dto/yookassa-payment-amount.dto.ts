import { IsString } from 'class-validator';

export class YookassaPaymentAmountDto {
  @IsString()
  value: string;
}
