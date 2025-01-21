import { PaymentStatus } from '@prisma/client';
import { YookassaWebhookEvent } from '../enums';

const eventToStatus: Record<YookassaWebhookEvent, PaymentStatus> = {
  [YookassaWebhookEvent.PaymentSucceeded]: PaymentStatus.Succeeded,
  [YookassaWebhookEvent.PaymentWaitingForCapture]: PaymentStatus.Pending,
  [YookassaWebhookEvent.PaymentCanceled]: PaymentStatus.Cancelled,
  [YookassaWebhookEvent.RefundSucceeded]: PaymentStatus.Refunded,
};

export const yookassaWebhookEventToPaymentType = (
  event: YookassaWebhookEvent,
): PaymentStatus => eventToStatus[event];
