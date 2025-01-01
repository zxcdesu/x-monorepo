import { PaymentStatus } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { lastValueFrom, map } from 'rxjs';
import { CreatePaymentDto, HandlePaymentDto, PaymentDto } from '../../dto';
import { AbstractPaymentProvider } from '../abstract-payment.provider';
import { YookassaWebhookDto } from './dto';
import { YookassaPendingPayment } from './types';
import { YookassaOptions } from './yookassa-options.interface';
import {
  YOOKASSA_API_URL,
  YOOKASSA_PAYMENT_EXPIRATION,
} from './yookassa.constants';

export class YookassaPaymentProvider extends AbstractPaymentProvider<
  YookassaOptions,
  YookassaWebhookDto
> {
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
    const createdAt = new Date(pendingPayment.created_at);

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
            url: pendingPayment.confirmation.confirmation_url,
          },
        },
      ),
    );
  }

  async handle(data: HandlePaymentDto<YookassaWebhookDto>): Promise<void> {
    const { object } = data.value;
    const payment = await this.prismaService.payment.findUnique({
      where: {
        externalId_provider: {
          externalId: object.id,
          provider: data.provider,
        },
      },
    });

    if (payment) {
      await this.success(
        payment,
        {
          'payment.succeeded': PaymentStatus.Succeeded,
          'payment.waiting_for_capture': PaymentStatus.Pending,
          'payment.canceled': PaymentStatus.Cancelled,
          'refund.succeeded': PaymentStatus.Refunded,
        }[data.value.event],
        (object.income_amount ?? object.refunded_amount ?? object.amount).value,
      );
    }
  }

  private pendingPayment(
    payment: PaymentDto,
    value: string,
    currency: string,
  ): Promise<YookassaPendingPayment> {
    return lastValueFrom(
      this.httpService
        .post<YookassaPendingPayment>(
          YOOKASSA_API_URL.concat('/payments'),
          {
            amount: {
              value,
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
    );
  }
}
