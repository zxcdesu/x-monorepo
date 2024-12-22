import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  SerializeOptions,
} from '@nestjs/common';
import { UserId } from 'src/user';
import { AuthService } from './auth.service';
import { SignInByEmailAndPasswordDto, SignInProjectDto, TokenDto } from './dto';

@Controller({
  path: ['auth'],
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @SerializeOptions({
    type: TokenDto,
  })
  signInByEmailAndPassword(
    @Body() data: SignInByEmailAndPasswordDto,
  ): Promise<TokenDto> {
    return this.authService.signInByEmailAndPassword(data);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @SerializeOptions({
    type: TokenDto,
  })
  signInProject(
    @UserId() userId: number,
    @Body() data: SignInProjectDto,
  ): Promise<TokenDto> {
    return this.authService.signInProject(userId, data);
  }
}
