import { Payment, PaymentProvider, PaymentStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Exclude, Expose, Transform } from 'class-transformer';
import { PaymentUrlDto } from './payment-url.dto';

@Exclude()
export class PaymentDto implements Payment {
  @Expose()
  id: number;

  @Exclude()
  projectId: number;

  @Exclude()
  externalId: string;

  @Expose()
  provider: PaymentProvider;

  @Expose()
  status: PaymentStatus;

  @Expose()
  @Transform(({ value }) => String(value), { toPlainOnly: true })
  amount: Decimal;

  @Expose()
  @Transform(({ value }) => String(value), { toPlainOnly: true })
  incomeAmount: Decimal;

  @Expose()
  expiresAt: Date;

  @Expose()
  url?: PaymentUrlDto;
}
