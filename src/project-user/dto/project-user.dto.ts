import { Exclude, Expose, Type } from 'class-transformer';
import { RoleDto } from 'src/role';
import { UserDto } from 'src/user';

@Exclude()
export class ProjectUserDto {
  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  @Type(() => RoleDto)
  roles: RoleDto[];
}
