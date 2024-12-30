import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentProvider } from '@prisma/client';
import { PaymentProviderModule } from './payment-provider';

@Module({
  imports: [
    PaymentProviderModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        [PaymentProvider.Yookassa]: {
          shopId: configService.getOrThrow<string>('YOOKASSA_SHOP_ID'),
          token: configService.getOrThrow<string>('YOOKASSA_TOKEN'),
          returnUrl: configService.getOrThrow<string>('YOOKASSA_RETURN_URL'),
        },
      }),
    }),
  ],
})
export class PaymentModule {}
