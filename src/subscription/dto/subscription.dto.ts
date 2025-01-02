import { Subscription } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SubscriptionDto
  implements Omit<Subscription, 'projectId' | 'planId'>
{
  @Expose()
  expiresAt: Date;
}
