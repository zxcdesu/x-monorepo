import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  SerializeOptions,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ProjectId, UserId } from './decorators';
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

  @Post('projects/:id/sign-in')
  @HttpCode(HttpStatus.OK)
  @SerializeOptions({
    type: TokenDto,
  })
  signInProject(
    @UserId() userId: string,
    @ProjectId() projectId: string,
  ): Promise<TokenDto> {
    return this.authService.signInProject(userId, projectId);
  }
}
