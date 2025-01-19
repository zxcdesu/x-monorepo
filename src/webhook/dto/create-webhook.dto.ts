import { Prisma, WebhookEvent } from '@prisma/client';
import { IsEnum, IsUrl } from 'class-validator';

export class CreateWebhookDto
  implements Omit<Prisma.WebhookUncheckedCreateInput, 'id' | 'projectId'>
{
  @IsEnum(WebhookEvent, {
    each: true,
  })
  events: WebhookEvent[];

  @IsUrl()
  url: string;
}
