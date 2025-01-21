import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ChannelAdapter } from '@prisma/client';
import { PrismaService } from 'src/common/prisma';
import { AbstractChannelAdapter } from './abstract-channel.adapter';
import { ChannelAdapterOptions } from './channel-adapter-option.interface';
import { MODULE_OPTIONS_TOKEN } from './channel-adapter.module-definition';
import { GupshupChannelAdapter } from './gupshup';
import { InstagramChannelAdapter } from './instagram';
import { TelegramChannelAdapter } from './telegram';
import { ViberChannelAdapter } from './viber';
import { VkontakteChannelAdapter } from './vkontakte';
import { WebappChannelAdapter } from './webapp';

@Injectable()
export class ChannelAdapterRepository
  implements Record<ChannelAdapter, typeof AbstractChannelAdapter<unknown>>
{
  [ChannelAdapter.Gupshup] = GupshupChannelAdapter;

  [ChannelAdapter.Instagram] = InstagramChannelAdapter;

  [ChannelAdapter.Telegram] = TelegramChannelAdapter;

  [ChannelAdapter.Viber] = ViberChannelAdapter;

  [ChannelAdapter.Vkontakte] = VkontakteChannelAdapter;

  [ChannelAdapter.Webapp] = WebappChannelAdapter;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: ChannelAdapterOptions,
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {}

  get(provider: ChannelAdapter): AbstractChannelAdapter {
    return new this[provider](
      this.options[provider],
      this.prismaService,
      this.httpService,
    );
  }
}
