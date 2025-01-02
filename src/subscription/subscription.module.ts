import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtOptionsFactoryService } from 'src/common/jwt';
import { PrismaModule } from 'src/common/prisma';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtOptionsFactoryService,
    }),
    PrismaModule,
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
