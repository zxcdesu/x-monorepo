import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma';
import { ConfigurableModuleClass } from './payment-adapter.module-definition';
import { PaymentAdapterRepository } from './payment-adapter.repository';

@Module({
  imports: [
    HttpModule.register({
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; PaymentProviderModule/1.0; +https://en.wikipedia.org/wiki/Webhook)',
      },
    }),
    PrismaModule,
  ],
  providers: [PaymentAdapterRepository],
  exports: [PaymentAdapterRepository],
})
export class PaymentAdapterModule extends ConfigurableModuleClass {}
