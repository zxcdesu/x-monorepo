import { Permission, Prisma } from '@prisma/client';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateRoleDto
  implements Omit<Prisma.RoleUncheckedCreateInput, 'id' | 'projectId'>
{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(Permission, {
    each: true,
  })
  permissions: Permission[];
}
