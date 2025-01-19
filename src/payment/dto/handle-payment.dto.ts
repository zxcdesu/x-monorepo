import { PaymentAdapter } from '@prisma/client';
import { IsDefined, IsEnum } from 'class-validator';

export class HandlePaymentDto<T> {
  @IsEnum(PaymentAdapter)
  adapter: PaymentAdapter;

  @IsDefined()
  data: T;
}
