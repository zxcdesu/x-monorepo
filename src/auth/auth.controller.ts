import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  SerializeOptions,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInByEmailAndPasswordDto, TokenDto } from './dto';

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
}
