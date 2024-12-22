import { Prisma } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto implements Prisma.UserUpdateInput {
  @IsOptional()
  @IsString()
  name: string;
}
