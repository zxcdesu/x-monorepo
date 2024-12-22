import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/common/prisma';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('SECRET'),
      }),
    }),
    PrismaModule,
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
