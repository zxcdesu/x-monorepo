import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { v7 } from 'uuid';
import { CreateWebhookDto, UpdateWebhookDto, WebhookDto } from './dto';

@Injectable()
export class WebhookService {
  constructor(private readonly prismaService: PrismaService) {}

  create(projectId: string, data: CreateWebhookDto): Promise<WebhookDto> {
    return this.prismaService.webhook.create({
      data: {
        id: v7(),
        projectId,
        ...data,
      },
    });
  }

  findOne(projectId: string, id: string): Promise<WebhookDto> {
    return this.prismaService.webhook.findUniqueOrThrow({
      where: {
        projectId,
        id,
      },
    });
  }

  findAll(projectId: string): Promise<WebhookDto[]> {
    return this.prismaService.webhook.findMany({
      where: {
        projectId,
      },
    });
  }

  update(
    projectId: string,
    id: string,
    data: UpdateWebhookDto,
  ): Promise<WebhookDto> {
    return this.prismaService.webhook.update({
      where: {
        projectId,
        id,
      },
      data,
    });
  }

  remove(projectId: string, id: string): Promise<WebhookDto> {
    return this.prismaService.webhook.delete({
      where: {
        projectId,
        id,
      },
    });
  }
}
