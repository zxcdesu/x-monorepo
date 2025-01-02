import {
  Body,
  Controller,
  Get,
  Post,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, ProjectId } from 'src/auth';
import { CreateSubscriptionDto, SubscriptionDto } from './dto';
import { SubscriptionService } from './subscription.service';

@Controller({
  path: ['subscriptions'],
  version: '1',
})
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: SubscriptionDto,
  })
  create(
    @ProjectId() projectId: number,
    @Body() data: CreateSubscriptionDto,
  ): Promise<SubscriptionDto> {
    return this.subscriptionService.create(projectId, data);
  }

  @Get('@me')
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: SubscriptionDto,
  })
  findMe(@ProjectId() projectId: number): Promise<SubscriptionDto> {
    return this.subscriptionService.findOne(projectId);
  }
}
