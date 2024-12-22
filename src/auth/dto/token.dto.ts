import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TokenDto {
  @Expose()
  token: string;
}
