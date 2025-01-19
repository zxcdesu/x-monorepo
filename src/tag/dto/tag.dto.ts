import { Tag } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';
import { TagWithoutParentAndChildrenDto } from './tag-without-parent-and-children.dto';

@Exclude()
export class TagDto extends TagWithoutParentAndChildrenDto implements Tag {
  @Expose()
  @Type(() => TagWithoutParentAndChildrenDto)
  parent?: TagWithoutParentAndChildrenDto;

  @Expose()
  @Type(() => TagWithoutParentAndChildrenDto)
  children: TagWithoutParentAndChildrenDto[];
}
