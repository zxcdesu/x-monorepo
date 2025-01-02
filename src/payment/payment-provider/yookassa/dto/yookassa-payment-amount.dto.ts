import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class YookassaPaymentAmountDto {
  @Expose()
  value: string;
}
