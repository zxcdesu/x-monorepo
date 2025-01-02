import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/common/prisma';
import { CreateSubscriptionDto, SubscriptionDto } from './dto';

@Injectable()
export class SubscriptionService {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    projectId: number,
    data: CreateSubscriptionDto,
  ): Promise<SubscriptionDto> {
    return this.prismaService.$transaction(async (transaction) => {
      const subscriptionPlan =
        await transaction.subscriptionPlan.findUniqueOrThrow({
          where: {
            id: data.planId,
          },
        });

      const wallet = await transaction.wallet.update({
        where: {
          projectId,
          currency: subscriptionPlan.currency,
        },
        data: {
          currentBalance: {
            decrement: subscriptionPlan.price,
          },
        },
      });

      if (wallet.currentBalance < new Decimal(0)) {
        throw new NotAcceptableException();
      }

      return transaction.subscription.create({
        data: {
          projectId,
          planId: subscriptionPlan.id,
          expiresAt: new Date(Date.now() + subscriptionPlan.duration),
        },
      });
    });
  }

  findOne(projectId: number): Promise<SubscriptionDto> {
    return this.prismaService.subscription.findUniqueOrThrow({
      where: {
        projectId,
      },
    });
  }
}
