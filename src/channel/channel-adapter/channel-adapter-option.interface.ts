import { ChannelAdapter } from '@prisma/client';
import { GupshupOptions } from './gupshup';
import { InstagramOptions } from './instagram';
import { TelegramOptions } from './telegram';
import { ViberOptions } from './viber';
import { VkontakteOptions } from './vkontakte';
import { WebappOptions } from './webapp';

export interface ChannelAdapterOptions {
  [ChannelAdapter.Gupshup]: GupshupOptions;
  [ChannelAdapter.Instagram]: InstagramOptions;
  [ChannelAdapter.Telegram]: TelegramOptions;
  [ChannelAdapter.Viber]: ViberOptions;
  [ChannelAdapter.Vkontakte]: VkontakteOptions;
  [ChannelAdapter.Webapp]: WebappOptions;
}
