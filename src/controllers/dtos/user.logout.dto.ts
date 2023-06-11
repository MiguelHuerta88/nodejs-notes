import { IsString, MaxLength } from 'class-validator';

export class UserLogoutDto {
  @IsString()
  @MaxLength(255)
  jwtToken: string;
}
