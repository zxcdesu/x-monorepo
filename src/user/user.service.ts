import { Injectable } from '@nestjs/common';
import { CryptoService } from 'src/common/crypto';
import { PrismaService } from 'src/common/prisma';
import { v7 } from 'uuid';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cryptoService: CryptoService,
  ) {}

  async create(data: CreateUserDto): Promise<UserDto> {
    return this.prismaService.user.create({
      data: {
        id: v7(),
        ...data,
        password: await this.cryptoService.hash(data.password),
      },
    });
  }

  findOne(id: string): Promise<UserDto> {
    return this.prismaService.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: string, data: UpdateUserDto): Promise<UserDto> {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: string): Promise<UserDto> {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
