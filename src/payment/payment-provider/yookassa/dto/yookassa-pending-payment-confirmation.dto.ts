import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class YookassaPendingPaymentConfirmationDto {
  @Expose({ name: 'confirmation_url' })
  confirmationUrl: string;
}
