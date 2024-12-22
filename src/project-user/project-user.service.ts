import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { ProjectUserDto } from './dto';

@Injectable()
export class ProjectUserService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(projectId: number): Promise<ProjectUserDto[]> {
    return this.prismaService.projectUser.findMany({
      where: {
        projectId,
      },
      include: {
        user: true,
      },
    });
  }
}
