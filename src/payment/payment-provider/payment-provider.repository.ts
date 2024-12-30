import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { PaymentProvider } from '@prisma/client';
import { PrismaService } from 'src/common/prisma';
import { AbstractPaymentProvider } from './abstract-payment.provider';
import { PaymentProviderOptions } from './payment-provider-options.interface';
import { MODULE_OPTIONS_TOKEN } from './payment-provider.module-definition';
import { YookassaPaymentProvider } from './yookassa';

@Injectable()
export class PaymentProviderRepository
  implements
    Record<PaymentProvider, typeof AbstractPaymentProvider<unknown, unknown>>
{
  readonly [PaymentProvider.Yookassa] = YookassaPaymentProvider;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: PaymentProviderOptions,
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {}

  get(provider: PaymentProvider): AbstractPaymentProvider {
    return new this[provider](
      this.options[provider],
      this.prismaService,
      this.httpService,
    );
  }
}
