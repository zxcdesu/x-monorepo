import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma';
import { SubscriptionPlanController } from './subscription-plan.controller';
import { SubscriptionPlanService } from './subscription-plan.service';

@Module({
  imports: [PrismaModule],
  controllers: [SubscriptionPlanController],
  providers: [SubscriptionPlanService],
})
export class SubscriptionPlanModule {}
