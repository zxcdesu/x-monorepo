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
  readonly [ChannelAdapter.Gupshup] = GupshupChannelAdapter;

  readonly [ChannelAdapter.Instagram] = InstagramChannelAdapter;

  readonly [ChannelAdapter.Telegram] = TelegramChannelAdapter;

  readonly [ChannelAdapter.Viber] = ViberChannelAdapter;

  readonly [ChannelAdapter.Vkontakte] = VkontakteChannelAdapter;

  readonly [ChannelAdapter.Webapp] = WebappChannelAdapter;

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
