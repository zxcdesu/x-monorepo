import { PrismaService } from 'src/common/prisma';
import { CreateRoleDto, RoleDto, UpdateRoleDto } from './dto';

export class RoleService {
  constructor(private readonly prismaService: PrismaService) {}

  create(projectId: number, data: CreateRoleDto): Promise<RoleDto> {
    return this.prismaService.role.create({
      data: {
        projectId,
        ...data,
      },
    });
  }

  findAll(projectId: number): Promise<RoleDto[]> {
    return this.prismaService.role.findMany({
      where: {
        projectId,
      },
    });
  }

  update(projectId: number, id: number, data: UpdateRoleDto): Promise<RoleDto> {
    return this.prismaService.role.update({
      where: {
        projectId,
        id,
        default: false,
      },
      data,
    });
  }

  remove(projectId: number, id: number): Promise<RoleDto> {
    return this.prismaService.role.delete({
      where: {
        projectId,
        id,
        default: false,
      },
    });
  }
}
