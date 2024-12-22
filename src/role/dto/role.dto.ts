import { Role } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RoleDto implements Role {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Exclude()
  projectId: number;

  @Exclude()
  userId: number;

  @Exclude()
  default: boolean;

  @Expose()
  permissions: string[];
}
