import { PaymentProvider, Prisma } from '@prisma/client';
import { IsDecimal, IsEnum } from 'class-validator';

export class CreatePaymentDto
  implements
    Omit<
      Prisma.PaymentUncheckedCreateInput,
      'projectId' | 'externalId' | 'status' | 'incomeAmount'
    >
{
  @IsEnum(PaymentProvider)
  provider: PaymentProvider;

  @IsDecimal()
  amount: string;
}
