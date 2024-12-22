import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { CreateWalletDto, WalletDto } from './dto';

@Injectable()
export class WalletService {
  constructor(private readonly prismaService: PrismaService) {}

  create(projectId: number, data: CreateWalletDto): Promise<WalletDto> {
    return this.prismaService.wallet.create({
      data: {
        projectId,
        ...data,
      },
    });
  }

  findOne(projectId: number): Promise<WalletDto> {
    return this.prismaService.wallet.findUniqueOrThrow({
      where: {
        projectId,
      },
    });
  }
}
