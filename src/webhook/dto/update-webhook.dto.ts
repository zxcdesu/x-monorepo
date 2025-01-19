import { PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';
import { CreateWebhookDto } from './create-webhook.dto';

export class UpdateWebhookDto
  extends PartialType(CreateWebhookDto)
  implements Prisma.WebhookUncheckedUpdateInput {}
