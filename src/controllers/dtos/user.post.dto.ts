import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UserPostDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(255)
  firstName: string;

  @IsString()
  @MaxLength(255)
  lastName: string;

  @IsString()
  @MinLength(8)
  password: string;
}
