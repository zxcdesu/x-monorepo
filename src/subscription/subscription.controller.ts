import { Controller, Get, SerializeOptions, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth';
import { SubscriptionDto } from './dto';
import { SubscriptionService } from './subscription.service';

@Controller({
  path: ['subscriptions'],
  version: '1',
})
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: SubscriptionDto,
  })
  findAll(): Promise<SubscriptionDto[]> {
    return this.subscriptionService.findAll();
  }
}
