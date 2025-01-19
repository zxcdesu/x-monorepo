import { Controller, Get, SerializeOptions, UseGuards } from '@nestjs/common';
import { AuthGuard, ProjectId } from 'src/auth';
import { ProjectUserDto } from './dto';
import { ProjectUserService } from './project-user.service';

@Controller({
  path: ['projects/@me/users'],
  version: '1',
})
export class ProjectUserController {
  constructor(private readonly projectUserService: ProjectUserService) {}

  @Get()
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: ProjectUserDto,
  })
  findAll(@ProjectId() projectId: string): Promise<ProjectUserDto[]> {
    return this.projectUserService.findAll(projectId);
  }
}
