import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { v7 } from 'uuid';
import { CreateProjectDto, ProjectDto, UpdateProjectDto } from './dto';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  create(userId: string, data: CreateProjectDto): Promise<ProjectDto> {
    return this.prismaService.project.create({
      data: {
        id: v7(),
        users: {
          create: {
            userId,
            // TODO: add default role
          },
        },
        ...data,
      },
    });
  }

  findOne(userId: string, id: string): Promise<ProjectDto> {
    return this.prismaService.project.findUniqueOrThrow({
      where: {
        id,
        users: {
          some: {
            userId,
          },
        },
      },
    });
  }

  findAll(userId: string): Promise<ProjectDto[]> {
    return this.prismaService.project.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
    });
  }

  update(
    userId: string,
    id: string,
    data: UpdateProjectDto,
  ): Promise<ProjectDto> {
    return this.prismaService.project.update({
      where: {
        id,
        users: {
          some: {
            userId,
          },
        },
      },
      data,
    });
  }

  remove(userId: string, id: string): Promise<ProjectDto> {
    return this.prismaService.project.delete({
      where: {
        id,
        users: {
          some: {
            userId,
          },
        },
      },
    });
  }
}
