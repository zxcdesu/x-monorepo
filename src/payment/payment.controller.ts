import {
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
import { CreatePaymentDto, HandlePaymentDto, PaymentDto } from './dto';
import { YookassaGuard } from './payment-provider';
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

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  @UseGuards(YookassaGuard)
  yookassaWebhook(@Body() data: HandlePaymentDto<unknown>): Promise<void> {
    return this.paymentService.handleWebhook(PaymentProvider.Yookassa, data);
  }
}
