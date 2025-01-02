import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma';
import { ConfigurableModuleClass } from './payment-provider.module-definition';
import { PaymentProviderRepository } from './payment-provider.repository';

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
  providers: [PaymentProviderRepository],
  exports: [PaymentProviderRepository],
})
export class PaymentProviderModule extends ConfigurableModuleClass {}
