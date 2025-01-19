import { User } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDto implements User {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Exclude()
  password: string;

  @Exclude()
  blocked: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
