import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, UserId } from 'src/auth';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto';
import { UserService } from './user.service';

@Controller({
  path: ['users'],
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @SerializeOptions({
    type: UserDto,
  })
  create(@Body() data: CreateUserDto): Promise<UserDto> {
    return this.userService.create(data);
  }

  @Get('@me')
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: UserDto,
  })
  findOne(@UserId() userId: string): Promise<UserDto> {
    return this.userService.findOne(userId);
  }

  @Patch('@me')
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: UserDto,
  })
  update(
    @UserId() userId: string,
    @Body() data: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.update(userId, data);
  }

  @Delete('@me')
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: UserDto,
  })
  remove(@UserId() userId: string): Promise<UserDto> {
    return this.userService.remove(userId);
  }
}
