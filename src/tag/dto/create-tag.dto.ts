import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTagDto
  implements Omit<Prisma.TagUncheckedCreateInput, 'id' | 'projectId'>
{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUUID()
  parentId?: string;
}
