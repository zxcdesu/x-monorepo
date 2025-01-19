import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, UserId } from 'src/auth';
import { CreateProjectDto, ProjectDto, UpdateProjectDto } from './dto';
import { ProjectService } from './project.service';

@Controller({
  path: ['projects'],
  version: '1',
})
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: ProjectDto,
  })
  create(
    @UserId() userId: string,
    @Body() data: CreateProjectDto,
  ): Promise<ProjectDto> {
    return this.projectService.create(userId, data);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(
    @UserId() userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ProjectDto> {
    return this.projectService.findOne(userId, id);
  }

  @Get()
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: ProjectDto,
  })
  findAll(@UserId() userId: string): Promise<ProjectDto[]> {
    return this.projectService.findAll(userId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: ProjectDto,
  })
  update(
    @UserId() userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateProjectDto,
  ): Promise<ProjectDto> {
    return this.projectService.update(userId, id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: ProjectDto,
  })
  remove(
    @UserId() userId: string,
    @Param('id', ParseIntPipe) id: string,
  ): Promise<ProjectDto> {
    return this.projectService.remove(userId, id);
  }
}
