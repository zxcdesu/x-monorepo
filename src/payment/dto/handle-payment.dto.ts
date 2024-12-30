import { IsDefined } from 'class-validator';

export class HandlePaymentDto<T> {
  @IsDefined()
  value: T;
}
