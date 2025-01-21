import { HttpService } from '@nestjs/axios';
import { PrismaService } from 'src/common/prisma';

export abstract class AbstractChannelAdapter<O = unknown> {
  constructor(
    protected readonly options: O,
    protected readonly prismaService: PrismaService,
    protected readonly httpService: HttpService,
  ) {}
}
