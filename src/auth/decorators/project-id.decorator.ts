import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { ProjectDto } from 'src/project';

type Request = FastifyRequest & {
  user?: {
    project?: Pick<ProjectDto, 'id'>;
  };
};

export const ProjectId = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();

  if (request.user?.project) {
    return request.user.project.id;
  }

  throw new UnauthorizedException();
});
