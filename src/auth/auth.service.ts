import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
      select: {
        id: true,
        password: true,
      },
    });

    if (await this.cryptoService.verify(user.password, data.password)) {
      delete user.password;

      return plainToInstance(TokenDto, {
        token: await this.jwtService.signAsync(user),
      });
    }

    throw new UnauthorizedException();
  }

  async signInProject(userId: string, projectId: string): Promise<TokenDto> {
    if (
      !Boolean(
        await this.prismaService.project.findUnique({
          where: {
            id: projectId,
            users: {
              some: {
                userId,
              },
            },
          },
        }),
      )
    ) {
      throw new ForbiddenException();
    }

    return plainToInstance(TokenDto, {
      token: await this.jwtService.signAsync({
        id: userId,
        project: {
          id: projectId,
        },
      }),
    });
  }
}
