import { Project } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ProjectDto implements Project {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
