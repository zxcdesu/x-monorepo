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
import { CreateWebhookDto, UpdateWebhookDto, WebhookDto } from './dto';
import { WebhookService } from './webhook.service';

@Controller({
  path: ['webhooks'],
  version: '1',
})
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: WebhookDto,
  })
  create(
    @ProjectId() projectId: string,
    @Body() data: CreateWebhookDto,
  ): Promise<WebhookDto> {
    return this.webhookService.create(projectId, data);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: WebhookDto,
  })
  findOne(
    @ProjectId() projectId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<WebhookDto> {
    return this.webhookService.findOne(projectId, id);
  }

  @Get()
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: WebhookDto,
  })
  findAll(@ProjectId() projectId: string): Promise<WebhookDto[]> {
    return this.webhookService.findAll(projectId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: WebhookDto,
  })
  update(
    @ProjectId() projectId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateWebhookDto,
  ): Promise<WebhookDto> {
    return this.webhookService.update(projectId, id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: WebhookDto,
  })
  delete(
    @ProjectId() projectId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<WebhookDto> {
    return this.webhookService.remove(projectId, id);
  }
}
