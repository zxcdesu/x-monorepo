import { IsEmail, IsString } from 'class-validator';

export class SignInByEmailAndPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
