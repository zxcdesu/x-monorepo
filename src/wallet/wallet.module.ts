import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtOptionsFactoryService } from 'src/common/jwt';
import { PrismaModule } from 'src/common/prisma';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtOptionsFactoryService,
    }),
    PrismaModule,
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
