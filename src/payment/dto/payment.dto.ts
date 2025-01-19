import { Payment, PaymentAdapter, PaymentStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { PaymentUrlDto } from './payment-url.dto';

@Exclude()
export class PaymentDto implements Payment {
  @Expose()
  id: string;

  @Exclude()
  projectId: string;

  @Expose()
  adapter: PaymentAdapter;

  @Exclude()
  externalId: string;

  @Expose()
  status: PaymentStatus;

  @Expose()
  @Transform(({ value }) => String(value), {
    toPlainOnly: true,
  })
  amount: Decimal;

  @Expose()
  @Transform(({ value }) => String(value), {
    toPlainOnly: true,
  })
  incomeAmount: Decimal;

  @Expose()
  expiresAt: Date;

  @Expose()
  @Type(() => PaymentUrlDto)
  url?: PaymentUrlDto;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
