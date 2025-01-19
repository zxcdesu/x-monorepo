import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { FastifyRequest } from 'fastify';
import { UserDto } from 'src/user';

export type UserId = FastifyRequest & {
  user?: Pick<UserDto, 'id'>;
};

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<UserId>();
  const userId = request.user?.id;

  if (isUUID(userId)) {
    return userId;
  }

  throw new UnauthorizedException();
});
