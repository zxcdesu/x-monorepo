import { Exclude, Expose, Type } from 'class-transformer';
import { YookassaWebhookEvent } from '../enums';
import { YookassaPaymentObjectDto } from './yookassa-payment-object.dto';

@Exclude()
export class YookassaWebhookDto {
  @Expose()
  event: YookassaWebhookEvent;

  @Expose()
  @Type(() => YookassaPaymentObjectDto)
  object: YookassaPaymentObjectDto;
}
