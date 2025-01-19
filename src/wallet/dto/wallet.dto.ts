import { Wallet } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class WalletDto implements Wallet {
  @Expose()
  projectId: string;

  @Expose()
  country: string;

  @Expose()
  currency: string;

  @Expose()
  @Transform(({ value }) => String(value), {
    toPlainOnly: true,
  })
  currentBalance: Decimal;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
