import { Controller, Get, SerializeOptions } from '@nestjs/common';
import { SubscriptionPlanDto } from './dto';
import { SubscriptionPlanService } from './subscription-plan.service';

@Controller({
  path: ['subscription-plans'],
  version: '1',
})
export class SubscriptionPlanController {
  constructor(
    private readonly subscriptionPlanService: SubscriptionPlanService,
  ) {}

  @Get()
  @SerializeOptions({
    type: SubscriptionPlanDto,
  })
  findAll(): Promise<SubscriptionPlanDto[]> {
    return this.subscriptionPlanService.findAll();
  }
}
