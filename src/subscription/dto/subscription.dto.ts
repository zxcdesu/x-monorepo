import { Subscription } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class SubscriptionDto implements Subscription {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  currency: string;

  @Expose()
  @Transform(({ value }) => String(value), {
    toPlainOnly: true,
  })
  price: Decimal;

  @Expose()
  duration: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
