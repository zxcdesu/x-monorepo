import { Permission, Role } from '@prisma/client';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class RoleDto implements Role {
  @Expose()
  id: string;

  @Exclude()
  projectId: string;

  @Expose()
  name: string;

  @Exclude()
  default: boolean;

  @Expose()
  permissions: Permission[];

  @Expose()
  @Transform(({ value }) => String(value), { toPlainOnly: true })
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => String(value), { toPlainOnly: true })
  updatedAt: Date;
}
