import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { BlockList } from 'node:net';
import { getIp } from 'src/common/http';

@Injectable()
export class YookassaGuard implements CanActivate {
  private readonly blockList = new BlockList();

  constructor() {
    this.blockList.addSubnet('185.71.76.0', 27);
    this.blockList.addSubnet('185.71.77.0', 27);
    this.blockList.addSubnet('77.75.153.0', 25);
    this.blockList.addAddress('77.75.156.11');
    this.blockList.addAddress('77.75.156.35');
    this.blockList.addSubnet('77.75.154.128', 25);
    this.blockList.addSubnet('2a02:5180::', 32, 'ipv6');
  }

  canActivate(context: ExecutionContext): boolean {
    return this.blockList.check(
      getIp(context.switchToHttp().getRequest<FastifyRequest>()),
    );
  }
}
