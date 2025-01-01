import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest } from 'fastify';

@Injectable()
export class PaymentGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<
      FastifyRequest<{
        Params: {
          secret?: string;
        };
      }>
    >();

    return this.configService.getOrThrow('SECRET') === request.params.secret;
  }
}
