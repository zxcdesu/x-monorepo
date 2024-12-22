import { Prisma } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProjectDto implements Prisma.ProjectUpdateInput {
  @IsOptional()
  @IsString()
  name?: string;
}
