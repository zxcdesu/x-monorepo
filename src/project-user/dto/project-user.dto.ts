import { ProjectUser } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';
import { UserDto } from 'src/user';
import { ProjectUserRoleDto } from './project-user-role.dto';

@Exclude()
export class ProjectUserDto implements ProjectUser {
  @Exclude()
  projectId: string;

  @Exclude()
  userId: string;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  @Type(() => ProjectUserRoleDto)
  roles: ProjectUserRoleDto[];
}
