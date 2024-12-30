import { FastifyRequest } from 'fastify';

export const getIp = (request: FastifyRequest): string | undefined => {
  if (typeof request.headers['x-forwarded-for'] === 'string') {
    return request.headers['x-forwarded-for'];
  }

  return request.ip;
};
