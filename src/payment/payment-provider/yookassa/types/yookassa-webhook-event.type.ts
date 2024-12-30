export type YookassaWebhookEvent =
  | 'payment.succeeded'
  | 'payment.waiting_for_capture'
  | 'payment.canceled'
  | 'refund.succeeded';
