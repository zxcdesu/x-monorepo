export enum YookassaWebhookEvent {
  PaymentSucceeded = 'payment.succeeded',
  PaymentWaitingForCapture = 'payment.waiting_for_capture',
  PaymentCanceled = 'payment.canceled',
  RefundSucceeded = 'refund.succeeded',
}
