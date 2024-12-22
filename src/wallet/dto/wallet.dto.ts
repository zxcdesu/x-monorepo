import { Wallet } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class WalletDto implements Wallet {
  @Expose()
  projectId: number;

  @Expose()
  country: string;

  @Expose()
  currency: string;

  @Expose()
  @Transform(({ value }) => String(value), { toPlainOnly: true })
  currentBalance: Decimal;
}
