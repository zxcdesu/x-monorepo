import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, ProjectId } from 'src/auth';
import { CreateTagDto, TagDto, UpdateTagDto } from './dto';
import { TagService } from './tag.service';

@Controller({
  path: ['tags'],
  version: '1',
})
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: TagDto,
  })
  create(
    @ProjectId() projectId: string,
    @Body() data: CreateTagDto,
  ): Promise<TagDto> {
    return this.tagService.create(projectId, data);
  }

  @Get('id')
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: TagDto,
  })
  findOne(
    @ProjectId() projectId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<TagDto> {
    return this.tagService.findOne(projectId, id);
  }

  @Get()
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: TagDto,
  })
  findAll(@ProjectId() projectId: string): Promise<TagDto[]> {
    return this.tagService.findAll(projectId);
  }

  @Patch('id')
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: TagDto,
  })
  update(
    @ProjectId() projectId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateTagDto,
  ): Promise<TagDto> {
    return this.tagService.update(projectId, id, data);
  }

  @Delete('id')
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: TagDto,
  })
  remove(
    @ProjectId() projectId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<TagDto> {
    return this.tagService.remove(projectId, id);
  }
}
