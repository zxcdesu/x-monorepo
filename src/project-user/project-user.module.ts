import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtOptionsFactoryService } from 'src/common/jwt';
import { PrismaModule } from 'src/common/prisma';
import { ProjectUserController } from './project-user.controller';
import { ProjectUserService } from './project-user.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtOptionsFactoryService,
    }),
    PrismaModule,
  ],
  controllers: [ProjectUserController],
  providers: [ProjectUserService],
})
export class ProjectUserModule {}
