import { PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto
  extends PartialType(CreateRoleDto)
  implements Prisma.RoleUncheckedUpdateInput {}
