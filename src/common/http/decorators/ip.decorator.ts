import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { getIp } from '../get-ip';

export const Ip = createParamDecorator((_, context: ExecutionContext) =>
  getIp(context.switchToHttp().getRequest<FastifyRequest>()),
);
