import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import Joi from 'joi';
import { AdminModule } from './admin';
import { AuthModule } from './auth';
import { BotModule } from './bot';
import { BotTemplateModule } from './bot-template';
import { ChannelModule } from './channel';
import { ChatModule } from './chat';
import { RateLimitModule } from './common/rate-limit';
import { ReportModule } from './common/report';
import { ContactModule } from './contact';
import { ContactFieldModule } from './contact-field';
import { ContactTagModule } from './contact-tag';
import { FieldModule } from './field';
import { FileModule } from './file';
import { HsmModule } from './hsm';
import { IntegrationModule } from './integration/integration.module';
import { MailingWorkerModule } from './mailing-worker';
import { MailingModule } from './mailing/mailing.module';
import { MessageModule } from './message';
import { NotificationModule } from './notification';
import { PaymentModule } from './payment/payment.module';
import { ProjectModule } from './project';
import { ProjectSubscriptionModule } from './project-subscription';
import { ProjectUserModule } from './project-user';
import { RoleModule } from './role';
import { SubscriptionModule } from './subscription';
import { TagModule } from './tag/tag.module';
import { TransactionModule } from './transaction';
import { UserModule } from './user';
import { WalletModule } from './wallet';
import { WebhookModule } from './webhook';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().default('development'),
        DATABASE_URL: Joi.string().uri().required(),
        PORT: Joi.number().port().default(3000),
        SECRET: Joi.string().required(),
        YOOKASSA_SHOP_ID: Joi.string().required(),
        YOOKASSA_TOKEN: Joi.string().required(),
        YOOKASSA_RETURN_URL: Joi.string().uri().required(),
      }),
    }),
    AdminModule,
    AuthModule,
    BotModule,
    BotTemplateModule,
    ChannelModule,
    ChatModule,
    RateLimitModule.forRoot({}),
    ReportModule.forRoot({}),
    ContactModule,
    ContactFieldModule,
    ContactTagModule,
    FieldModule,
    FileModule,
    HsmModule,
    IntegrationModule,
    MailingModule,
    MailingWorkerModule,
    MessageModule,
    NotificationModule,
    PaymentModule,
    ProjectModule,
    ProjectSubscriptionModule,
    ProjectUserModule,
    RoleModule,
    SubscriptionModule,
    TagModule,
    TransactionModule,
    UserModule,
    WalletModule,
    WebhookModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
