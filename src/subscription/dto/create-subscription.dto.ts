import { Prisma } from '@prisma/client';
import { IsInt } from 'class-validator';

export class CreateSubscriptionDto
  implements
    Omit<Prisma.SubscriptionUncheckedCreateInput, 'projectId' | 'expiresAt'>
{
  @IsInt()
  planId: number;
}
