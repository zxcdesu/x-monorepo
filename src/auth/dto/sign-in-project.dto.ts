import { IsInt } from 'class-validator';

export class SignInProjectDto {
  @IsInt()
  id: number;
}
