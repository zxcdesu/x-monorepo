import { Exclude, Expose, Type } from 'class-transformer';
import { UserDto } from 'src/user';

@Exclude()
export class ProjectUserDto {
  @Expose()
  @Type(() => UserDto)
  user: UserDto;
}
