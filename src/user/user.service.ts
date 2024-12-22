import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateUserDto): Promise<UserDto> {
    return this.prismaService.user.create({
      data,
    });
  }

  findOne(id: number): Promise<UserDto> {
    return this.prismaService.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: number, data: UpdateUserDto): Promise<UserDto> {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: number): Promise<UserDto> {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
