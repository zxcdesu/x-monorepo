import { Prisma } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateProjectDto
  implements Omit<Prisma.ProjectUncheckedCreateInput, 'id'>
{
  @IsString()
  name: string;
}
