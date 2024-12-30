import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { UserDto } from 'src/user';

type Request = FastifyRequest & {
  user?: Pick<UserDto, 'id'>;
};

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  const userId = request.user?.id;

  if (!userId) {
    throw new UnauthorizedException();
  }

  return userId;
});
