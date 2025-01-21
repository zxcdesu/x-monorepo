import { HttpService } from '@nestjs/axios';
import { PaymentStatus } from '@prisma/client';
import { PrismaService } from 'src/common/prisma';
import { CreatePaymentDto, HandlePaymentDto, PaymentDto } from '../dto';

export abstract class AbstractPaymentAdapter<O = unknown, T = unknown> {
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
    amount?: string,
  ): Promise<PaymentDto> {
    return this.prismaService.$transaction(async (transaction) => {
      payment = await transaction.payment.update({
        where: {
          id: payment.id,
        },
        data: {
          status,
          incomeAmount: amount,
        },
      });

      switch (status) {
        case PaymentStatus.Succeeded:
          await transaction.wallet.update({
            where: {
              projectId: payment.projectId,
            },
            data: {
              currentBalance: {
                increment: amount,
              },
            },
          });
          break;

        case PaymentStatus.Refunded:
          await transaction.wallet.update({
            where: {
              projectId: payment.projectId,
            },
            data: {
              currentBalance: {
                decrement: amount,
              },
            },
          });
          break;
      }

      return payment;
    });
  }
}
