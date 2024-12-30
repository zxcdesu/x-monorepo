import { Injectable } from '@nestjs/common';
import { PaymentProvider } from '@prisma/client';
import { PrismaService } from 'src/common/prisma';
import { CreatePaymentDto, HandlePaymentDto, PaymentDto } from './dto';
import { PaymentProviderRepository } from './payment-provider';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentProviderRepository: PaymentProviderRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async create(projectId: number, data: CreatePaymentDto): Promise<PaymentDto> {
    return this.paymentProviderRepository.get(data.provider).create(
      data,
      await this.prismaService.payment.create({
        data: {
          projectId,
          ...data,
        },
      }),
    );
  }

  handleWebhook(
    provider: PaymentProvider,
    data: HandlePaymentDto<unknown>,
  ): Promise<void> {
    return this.paymentProviderRepository.get(provider).handle(data);
  }
}
