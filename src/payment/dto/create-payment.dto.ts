import { PaymentAdapter, Prisma } from '@prisma/client';
import { IsDecimal, IsEnum } from 'class-validator';

export class CreatePaymentDto
  implements
    Omit<
      Prisma.PaymentUncheckedCreateInput,
      'id' | 'projectId' | 'externalId' | 'status' | 'incomeAmount'
    >
{
  @IsEnum(PaymentAdapter)
  adapter: PaymentAdapter;

  @IsDecimal()
  amount: string;
}
