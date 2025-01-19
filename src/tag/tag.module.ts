import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtOptionsFactoryService } from 'src/common/jwt';
import { PrismaModule } from 'src/common/prisma';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtOptionsFactoryService,
    }),
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class TagModule {}
