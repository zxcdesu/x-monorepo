import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ProjectId } from 'src/auth';
import { SubscriptionService } from './subscription.service';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ProjectId>();
    const subscription = await this.subscriptionService.findOne(
      request.user?.project?.id,
    );

    return !subscription || Date.now() <= subscription.expiresAt.getTime();
  }
}
