import { Project } from '@prisma/client';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class ProjectDto implements Project {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Exclude()
  blocked: boolean;

  @Expose()
  @Transform(({ value }) => String(value), {
    toPlainOnly: true,
  })
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => String(value), {
    toPlainOnly: true,
  })
  updatedAt: Date;
}
