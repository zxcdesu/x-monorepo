import { ConfigurableModuleBuilder } from '@nestjs/common';
import { ChannelAdapterOptions } from './channel-adapter-option.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<ChannelAdapterOptions>()
    .setClassMethodName('forRoot')
    .build();
