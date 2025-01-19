import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { PaymentAdapter } from '@prisma/client';
import { PrismaService } from 'src/common/prisma';
import { AbstractPaymentAdapter } from './abstract-payment.adapter';
import { PaymentAdapterOptions } from './payment-adapter-options.interface';
import { MODULE_OPTIONS_TOKEN } from './payment-adapter.module-definition';
import { YookassaPaymentAdapter } from './yookassa';

@Injectable()
export class PaymentAdapterRepository
  implements
    Record<PaymentAdapter, typeof AbstractPaymentAdapter<unknown, unknown>>
{
  readonly [PaymentAdapter.Yookassa] = YookassaPaymentAdapter;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: PaymentAdapterOptions,
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {}

  get(provider: PaymentAdapter): AbstractPaymentAdapter {
    return new this[provider](
      this.options[provider],
      this.prismaService,
      this.httpService,
    );
  }
}
