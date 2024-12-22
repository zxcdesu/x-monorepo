import {
  Body,
  Controller,
  Get,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth';
import { ProjectId } from 'src/project';
import { CreateWalletDto, WalletDto } from './dto';
import { WalletService } from './wallet.service';

@Controller({
  path: ['wallets'],
  version: '1',
})
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  create(
    @ProjectId() projectId: number,
    @Body() data: CreateWalletDto,
  ): Promise<WalletDto> {
    return this.walletService.create(projectId, data);
  }

  @Get('@me')
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: WalletDto,
  })
  findMe(@ProjectId() projectId: number): Promise<WalletDto> {
    return this.walletService.findOne(projectId);
  }
}
