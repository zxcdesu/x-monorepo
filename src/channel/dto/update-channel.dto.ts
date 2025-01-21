import { PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';
import { CreateChannelDto } from './create-channel.dto';

export class UpdateChannelDto
  extends PartialType(CreateChannelDto)
  implements Prisma.ChatUncheckedUpdateInput {}
