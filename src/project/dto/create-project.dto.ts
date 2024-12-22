import { Prisma } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateProjectDto implements Prisma.ProjectCreateInput {
  @IsString()
  name: string;
}
