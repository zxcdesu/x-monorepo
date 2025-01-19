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
import { CreateRoleDto, RoleDto, UpdateRoleDto } from './dto';
import { RoleService } from './role.service';

@Controller({
  path: ['roles'],
  version: '1',
})
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: RoleDto,
  })
  create(
    @ProjectId() projectId: string,
    @Body() data: CreateRoleDto,
  ): Promise<RoleDto> {
    return this.roleService.create(projectId, data);
  }

  @Get()
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: RoleDto,
  })
  findAll(@ProjectId() projectId: string): Promise<RoleDto[]> {
    return this.roleService.findAll(projectId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: RoleDto,
  })
  update(
    @ProjectId() projectId: string,
    @Param('id', ParseUUIDPipe) id: string,
    data: UpdateRoleDto,
  ): Promise<RoleDto> {
    return this.roleService.update(projectId, id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: RoleDto,
  })
  remove(
    @ProjectId() projectId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<RoleDto> {
    return this.roleService.remove(projectId, id);
  }
}
