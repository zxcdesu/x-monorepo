import { PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto
  extends PartialType(CreateProjectDto)
  implements Prisma.ProjectUncheckedUpdateInput {}
