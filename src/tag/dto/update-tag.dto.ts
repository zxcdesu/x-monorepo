import { PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';
import { CreateTagDto } from './create-tag.dto';

export class UpdateTagDto
  extends PartialType(CreateTagDto)
  implements Prisma.TagUncheckedUpdateInput {}
