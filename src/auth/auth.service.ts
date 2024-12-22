import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { CryptoService } from 'src/common/crypto';
import { PrismaService } from 'src/common/prisma';
import { SignInByEmailAndPasswordDto, TokenDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
  ) {}

  async signInByEmailAndPassword(
    data: SignInByEmailAndPasswordDto,
  ): Promise<TokenDto> {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: {
        email: data.email,
      },
    });

    if (await this.cryptoService.verify(user.password, data.password)) {
      return plainToInstance(TokenDto, {
        token: await this.jwtService.signAsync(user),
      });
    }

    throw new UnauthorizedException();
  }
}
