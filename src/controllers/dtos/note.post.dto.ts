import { IsString, MaxLength } from 'class-validator';

export class NotePostDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  notes: string;
}
