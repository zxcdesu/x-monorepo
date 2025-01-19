import { PaymentStatus } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { lastValueFrom, map } from 'rxjs';
import { CreatePaymentDto, HandlePaymentDto, PaymentDto } from '../../dto';
import { AbstractPaymentAdapter } from '../abstract-payment.adapter';
import { YookassaPendingPaymentDto, YookassaWebhookDto } from './dto';
import { YookassaWebhookEvent } from './enums';
import { YookassaOptions } from './yookassa-options.interface';
import {
  YOOKASSA_API_URL,
  YOOKASSA_PAYMENT_EXPIRATION,
} from './yookassa.constants';

export class YookassaPaymentAdapter extends AbstractPaymentAdapter<
  YookassaOptions,
  YookassaWebhookDto
> {
  private static readonly eventToStatus: Record<
    YookassaWebhookEvent,
    PaymentStatus
  > = {
    [YookassaWebhookEvent.PaymentSucceeded]: PaymentStatus.Succeeded,
    [YookassaWebhookEvent.PaymentWaitingForCapture]: PaymentStatus.Pending,
    [YookassaWebhookEvent.PaymentCanceled]: PaymentStatus.Cancelled,
    [YookassaWebhookEvent.RefundSucceeded]: PaymentStatus.Refunded,
  };

  async create(
    data: CreatePaymentDto,
    payment: PaymentDto,
  ): Promise<PaymentDto> {
    const wallet = await this.prismaService.wallet.findUniqueOrThrow({
      where: {
        projectId: payment.projectId,
      },
    });

    const pendingPayment = await this.pendingPayment(
      payment,
      data.amount,
      wallet.currency,
    );

    const createdAt = new Date(pendingPayment.createdAt);

    return plainToClass(
      PaymentDto,
      Object.assign(
        await this.start(
          payment,
          pendingPayment.id,
          new Date(createdAt.getTime() + YOOKASSA_PAYMENT_EXPIRATION),
        ),
        {
          url: {
            url: pendingPayment.confirmation.confirmationUrl,
          },
        },
      ),
    );
  }

  async handle(data: HandlePaymentDto<YookassaWebhookDto>): Promise<void> {
    const { object } = data.data;
    const payment = await this.prismaService.payment.findUnique({
      where: {
        externalId_adapter: {
          externalId: object.id,
          adapter: data.adapter,
        },
      },
    });

    if (payment) {
      const amount =
        object.incomeAmount ?? object.refundedAmount ?? object.amount;

      await this.success(
        payment,
        YookassaPaymentAdapter.eventToStatus[data.data.event],
        amount.value,
      );
    }
  }

  private async pendingPayment(
    payment: PaymentDto,
    amount: string,
    currency: string,
  ): Promise<YookassaPendingPaymentDto> {
    return plainToClass(
      YookassaPendingPaymentDto,
      await lastValueFrom(
        this.httpService
          .post<YookassaPendingPaymentDto>(
            YOOKASSA_API_URL.concat('/payments'),
            {
              amount: {
                value: amount,
                currency,
              },
              capture: true,
              confirmation: {
                type: 'redirect',
                return_url: this.options.returnUrl,
              },
              description: null,
            },
            {
              auth: {
                username: this.options.shopId,
                password: this.options.token,
              },
              headers: {
                'Idempotence-Key': payment.id,
              },
            },
          )
          .pipe(map(({ data }) => data)),
      ),
    );
  }
}
