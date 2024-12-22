import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash, verify } from 'argon2';

@Injectable()
export class CryptoService {
  constructor(private readonly configService: ConfigService) {}

  hash(data: string): Promise<string> {
    const secret = this.configService.getOrThrow<string>('SECRET');

    return hash(data, {
      secret: Buffer.from(secret),
    });
  }

  verify(hash: string, data: string): Promise<boolean> {
    const secret = this.configService.getOrThrow<string>('SECRET');

    return verify(hash, data, {
      secret: Buffer.from(secret),
    });
  }
}
