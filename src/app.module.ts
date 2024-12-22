import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { AuthModule } from './auth';
import { RateLimitModule } from './common/rate-limit';
import { ReportModule } from './common/report';
import { UserModule } from './user';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().uri().required(),
        PORT: Joi.number().port().default(3000),
        SECRET: Joi.string().required(),
      }),
    }),
    AuthModule,
    RateLimitModule.forRoot({}),
    ReportModule.forRoot({}),
    UserModule,
  ],
})
export class AppModule {}
