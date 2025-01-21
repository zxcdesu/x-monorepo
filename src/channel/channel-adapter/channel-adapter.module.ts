import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma';
import { ConfigurableModuleClass } from './channel-adapter.module-definition';
import { ChannelAdapterRepository } from './channel-adapter.repository';

@Module({
  imports: [
    HttpModule.register({
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; ChannelAdapterModule/1.0; +https://en.wikipedia.org/wiki/Webhook)',
      },
    }),
    PrismaModule,
  ],
  providers: [ChannelAdapterRepository],
  exports: [ChannelAdapterRepository],
})
export class ChannelAdapterModule extends ConfigurableModuleClass {}
