import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import Joi from 'joi';
import { AuthModule } from './auth';
import { RateLimitModule } from './common/rate-limit';
import { ReportModule } from './common/report';
import { PaymentModule } from './payment/payment.module';
import { ProjectModule } from './project';
import { ProjectUserModule } from './project-user';
import { RoleModule } from './role';
import { UserModule } from './user';
import { WalletModule } from './wallet';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().optional(),
        DATABASE_URL: Joi.string().uri().required(),
        PORT: Joi.number().port().default(3000),
        SECRET: Joi.string().required(),
        YOOKASSA_SHOP_ID: Joi.string().required(),
        YOOKASSA_TOKEN: Joi.string().required(),
        YOOKASSA_RETURN_URL: Joi.string().uri().required(),
      }),
    }),
    AuthModule,
    RateLimitModule.forRoot({}),
    ReportModule.forRoot({}),
    PaymentModule,
    ProjectModule,
    ProjectUserModule,
    RoleModule,
    UserModule,
    WalletModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
