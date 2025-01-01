import {
  All,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { PaymentProvider } from '@prisma/client';
import { AuthGuard, ProjectId } from 'src/auth';
import { CreatePaymentDto, PaymentDto } from './dto';
import { YookassaGuard, YookassaWebhookDto } from './payment-provider';
import { PaymentGuard } from './payment.guard';
import { PaymentService } from './payment.service';

@Controller({
  path: ['payments'],
  version: '1',
})
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @UseGuards(AuthGuard)
  @SerializeOptions({
    type: PaymentDto,
  })
  create(
    @ProjectId() projectId: number,
    data: CreatePaymentDto,
  ): Promise<PaymentDto> {
    return this.paymentService.create(projectId, data);
  }

  @All('webhook/:secret/yookassa')
  @HttpCode(HttpStatus.OK)
  @UseGuards(PaymentGuard, YookassaGuard)
  yookassaWebhook(@Body() data: YookassaWebhookDto): Promise<void> {
    return this.paymentService.handleWebhook(PaymentProvider.Yookassa, {
      provider: PaymentProvider.Yookassa,
      value: data,
    });
  }
}
