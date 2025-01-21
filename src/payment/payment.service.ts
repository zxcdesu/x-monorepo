import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { v7 } from 'uuid';
import { CreatePaymentDto, HandlePaymentDto, PaymentDto } from './dto';
import { PaymentAdapterRepository } from './payment-adapter';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentProviderRepository: PaymentAdapterRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async create(projectId: string, data: CreatePaymentDto): Promise<PaymentDto> {
    return this.paymentProviderRepository.get(data.adapter).create(
      data,
      await this.prismaService.payment.create({
        data: {
          id: v7(),
          projectId,
          ...data,
        },
      }),
    );
  }

  handleWebhook(data: HandlePaymentDto<unknown>): Promise<void> {
    return this.paymentProviderRepository.get(data.adapter).handle(data);
  }
}
