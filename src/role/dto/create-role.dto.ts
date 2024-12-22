import { Prisma } from '@prisma/client';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto
  implements Omit<Prisma.RoleUncheckedCreateInput, 'projectId'>
{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  permissions: string[];
}
