import { Type } from 'class-transformer';
import { IsEnum, ValidateNested } from 'class-validator';
import { YookassaWebhookEvent } from '../enums';
import { YookassaPaymentObjectDto } from './yookassa-payment-object.dto';

export class YookassaWebhookDto {
  @IsEnum(YookassaWebhookEvent)
  event: YookassaWebhookEvent;

  @Type(() => YookassaPaymentObjectDto)
  @ValidateNested()
  object: YookassaPaymentObjectDto;
}
