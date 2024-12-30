import { YookassaPaymentObject } from './yookassa-payment-object.type';
import { YookassaWebhookEvent } from './yookassa-webhook-event.type';

export interface YookassaWebhook {
  event: YookassaWebhookEvent;
  object: YookassaPaymentObject;
}
