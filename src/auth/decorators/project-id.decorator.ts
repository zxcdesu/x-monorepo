import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { FastifyRequest } from 'fastify';
import { ProjectDto } from 'src/project';

export type ProjectId = FastifyRequest & {
  user?: {
    project?: Pick<ProjectDto, 'id'>;
  };
};

export const ProjectId = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<ProjectId>();
  const projectId = request.user?.project?.id;

  if (isUUID(projectId)) {
    return projectId;
  }

  throw new UnauthorizedException();
});
