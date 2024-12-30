import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PaymentUrlDto {
  @Expose()
  url: string;
}
