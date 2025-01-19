import { Tag } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TagWithoutParentAndChildrenDto implements Tag {
  @Expose()
  id: string;

  @Exclude()
  projectId: string;

  @Expose()
  name: string;

  @Exclude()
  parentId: string | null;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
