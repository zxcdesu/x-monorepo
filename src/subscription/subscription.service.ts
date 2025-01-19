import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { SubscriptionDto } from './dto';

@Injectable()
export class SubscriptionService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(): Promise<SubscriptionDto[]> {
    return this.prismaService.subscription.findMany({});
  }
}
