import { HttpService } from '@nestjs/axios';
import { PaymentStatus } from '@prisma/client';
import { PrismaService } from 'src/common/prisma';
import { CreatePaymentDto, HandlePaymentDto, PaymentDto } from '../dto';

export abstract class AbstractPaymentProvider<O = unknown, T = unknown> {
  constructor(
    protected readonly options: O,
    protected readonly prismaService: PrismaService,
    protected readonly httpService: HttpService,
  ) {}

  abstract create(
    data: CreatePaymentDto,
    payment: PaymentDto,
  ): Promise<PaymentDto>;

  abstract handle(data: HandlePaymentDto<T>): Promise<void>;

  protected start(
    payment: PaymentDto,
    externalId?: string,
    expiresAt?: Date,
  ): Promise<PaymentDto> {
    return this.prismaService.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        externalId,
        expiresAt,
      },
    });
  }

  protected success(
    payment: PaymentDto,
    status: PaymentStatus,
    incomeAmount?: string,
  ): Promise<PaymentDto> {
    return this.prismaService.$transaction(async (transaction) => {
      payment = await transaction.payment.update({
        where: {
          id: payment.id,
        },
        data: {
          status,
          incomeAmount,
        },
      });

      if (status === PaymentStatus.Succeeded) {
        await transaction.wallet.update({
          where: {
            projectId: payment.projectId,
          },
          data: {
            currentBalance: {
              increment: incomeAmount,
            },
          },
        });
      }

      return payment;
    });
  }
}
