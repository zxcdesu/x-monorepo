import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { CreateProjectDto, ProjectDto, UpdateProjectDto } from './dto';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  create(userId: number, data: CreateProjectDto): Promise<ProjectDto> {
    return this.prismaService.project.create({
      data: {
        users: {
          create: {
            userId,
            roles: {
              create: {
                name: data.name,
                default: true,
              },
            },
          },
        },
        ...data,
      },
    });
  }

  findOne(userId: number, id: number): Promise<ProjectDto> {
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

  findAll(userId: number): Promise<ProjectDto[]> {
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
    userId: number,
    id: number,
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

  remove(userId: number, id: number): Promise<ProjectDto> {
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
