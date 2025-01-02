import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const subscription = await this.subscriptionService.findOne(
      request.user?.project?.id,
    );

    return Date.now() <= subscription.expiresAt.getTime();
  }
}
