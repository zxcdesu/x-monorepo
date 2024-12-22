import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ProjectDto {
  @Expose()
  id: number;
}
