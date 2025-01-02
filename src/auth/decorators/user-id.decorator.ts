import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { UserDto } from 'src/user';

export type UserId = FastifyRequest & {
  user?: Pick<UserDto, 'id'>;
};

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<UserId>();
  const userId = request.user?.id;

  if (!userId) {
    throw new UnauthorizedException();
  }

  return userId;
});
