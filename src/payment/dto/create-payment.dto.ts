import { PaymentProvider, PaymentStatus, Prisma } from '@prisma/client';
import { IsDecimal, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto
  implements Omit<Prisma.PaymentUncheckedCreateInput, 'projectId'>
{
  @IsOptional()
  @IsString()
  externalId?: string;

  @IsEnum(PaymentProvider)
  provider: PaymentProvider;

  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @IsDecimal()
  amount: string;

  @IsOptional()
  @IsDecimal()
  incomeAmount?: string;
}
