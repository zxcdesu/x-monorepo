import { IsUrl } from 'class-validator';

export class YookassaPendingPaymentConfirmationDto {
  @IsUrl()
  confirmation_url: string;
}
