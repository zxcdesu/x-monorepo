import { ProjectUserRole } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';
import { RoleDto } from 'src/role';

@Exclude()
export class ProjectUserRoleDto implements ProjectUserRole {
  @Exclude()
  projectId: string;

  @Exclude()
  userId: string;

  @Exclude()
  roleId: string;

  @Expose()
  @Type(() => RoleDto)
  role: RoleDto;
}
