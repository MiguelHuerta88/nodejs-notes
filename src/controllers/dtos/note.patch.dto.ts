import { IsOptional, IsString } from 'class-validator';

export class NotePatchDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  notes: string;
}
