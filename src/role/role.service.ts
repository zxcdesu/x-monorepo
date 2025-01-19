import { PrismaService } from 'src/common/prisma';
import { v7 } from 'uuid';
import { CreateRoleDto, RoleDto, UpdateRoleDto } from './dto';

export class RoleService {
  constructor(private readonly prismaService: PrismaService) {}

  create(projectId: string, data: CreateRoleDto): Promise<RoleDto> {
    return this.prismaService.role.create({
      data: {
        id: v7(),
        projectId,
        ...data,
      },
    });
  }

  findOne(projectId: string, id: string): Promise<RoleDto> {
    return this.prismaService.role.findUniqueOrThrow({
      where: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: string): Promise<RoleDto[]> {
    return this.prismaService.role.findMany({
      where: {
        projectId,
      },
    });
  }

  update(projectId: string, id: string, data: UpdateRoleDto): Promise<RoleDto> {
    return this.prismaService.role.update({
      where: {
        projectId,
        id,
        default: false,
      },
      data,
    });
  }

  remove(projectId: string, id: string): Promise<RoleDto> {
    return this.prismaService.role.delete({
      where: {
        projectId,
        id,
        default: false,
      },
    });
  }
}
