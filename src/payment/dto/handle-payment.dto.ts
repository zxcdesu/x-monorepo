import { PaymentProvider } from '@prisma/client';
import { IsDefined, IsEnum } from 'class-validator';

export class HandlePaymentDto<T> {
  @IsEnum(PaymentProvider)
  provider: PaymentProvider;

  @IsDefined()
  value: T;
}
