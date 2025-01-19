import { Webhook, WebhookEvent } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class WebhookDto implements Webhook {
  @Expose()
  id: string;

  @Exclude()
  projectId: string;

  @Expose()
  url: string;

  @Expose()
  events: WebhookEvent[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
