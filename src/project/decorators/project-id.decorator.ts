import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { ProjectDto } from '../dto';

export const ProjectId = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<
    FastifyRequest & {
      user: {
        project: ProjectDto;
      };
    }
  >();

  return request.user.project.id;
});
