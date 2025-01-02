import { SubscriptionPlan } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class SubscriptionPlanDto implements SubscriptionPlan {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ value }) => String(value), { toPlainOnly: true })
  price: Decimal;

  @Expose()
  currency: string;

  @Expose()
  duration: number;
}
