import { Body, Controller, Param, ParseIntPipe } from '@nestjs/common';
import { ProjectId } from 'src/auth';
import { CreateRoleDto, RoleDto, UpdateRoleDto } from './dto';
import { RoleService } from './role.service';

@Controller({
  path: ['roles'],
  version: '1',
})
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  create(
    @ProjectId() projectId: number,
    @Body() data: CreateRoleDto,
  ): Promise<RoleDto> {
    return this.roleService.create(projectId, data);
  }

  findAll(@ProjectId() projectId: number): Promise<RoleDto[]> {
    return this.roleService.findAll(projectId);
  }

  update(
    @ProjectId() projectId: number,
    @Param('id', ParseIntPipe) id: number,
    data: UpdateRoleDto,
  ): Promise<RoleDto> {
    return this.roleService.update(projectId, id, data);
  }

  remove(
    @ProjectId() projectId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RoleDto> {
    return this.roleService.remove(projectId, id);
  }
}
