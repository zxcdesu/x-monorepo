import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/common/prisma';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

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
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
