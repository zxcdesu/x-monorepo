import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { SubscriptionPlanDto } from './dto';

@Injectable()
export class SubscriptionPlanService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(): Promise<SubscriptionPlanDto[]> {
    return this.prismaService.subscriptionPlan.findMany();
  }
}
