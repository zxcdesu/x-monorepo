import { Prisma } from '@prisma/client';
import {
  IsISO31661Alpha2,
  IsISO4217CurrencyCode,
  IsOptional,
} from 'class-validator';

export class CreateWalletDto
  implements Omit<Prisma.WalletUncheckedCreateInput, 'projectId'>
{
  @IsISO31661Alpha2()
  country: string;

  @IsOptional()
  @IsISO4217CurrencyCode()
  currency?: string;
}
