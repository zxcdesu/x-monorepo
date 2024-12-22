import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { UserDto } from './dto';

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<
    FastifyRequest & {
      user: UserDto;
    }
  >();

  return request.user.id;
});
