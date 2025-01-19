import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { v7 } from 'uuid';
import { CreateTagDto, TagDto, UpdateTagDto } from './dto';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  create(projectId: string, data: CreateTagDto): Promise<TagDto> {
    return this.prismaService.tag.create({
      data: {
        id: v7(),
        projectId,
        ...data,
      },
      include: {
        children: true,
      },
    });
  }

  findOne(projectId: string, id: string): Promise<TagDto> {
    return this.prismaService.tag.findUniqueOrThrow({
      where: {
        projectId,
        id,
      },
      include: {
        children: true,
      },
    });
  }

  findAll(projectId: string): Promise<TagDto[]> {
    return this.prismaService.tag.findMany({
      where: {
        projectId,
      },
      include: {
        children: true,
      },
    });
  }

  update(projectId: string, id: string, data: UpdateTagDto): Promise<TagDto> {
    return this.prismaService.tag.update({
      where: {
        projectId,
        id,
      },
      data,
      include: {
        children: true,
      },
    });
  }

  remove(projectId: string, id: string): Promise<TagDto> {
    return this.prismaService.tag.delete({
      where: {
        projectId,
        id,
      },
      include: {
        children: true,
      },
    });
  }
}
