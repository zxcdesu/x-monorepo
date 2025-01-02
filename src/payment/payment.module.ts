import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PaymentProvider } from '@prisma/client';
import { JwtOptionsFactoryService } from 'src/common/jwt';
import { PrismaModule } from 'src/common/prisma';
import { PaymentProviderModule } from './payment-provider';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtOptionsFactoryService,
    }),
    PrismaModule,
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
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
