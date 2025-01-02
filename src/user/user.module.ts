import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CryptoModule } from 'src/common/crypto';
import { JwtOptionsFactoryService } from 'src/common/jwt';
import { PrismaModule } from 'src/common/prisma';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtOptionsFactoryService,
    }),
    CryptoModule,
    PrismaModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
