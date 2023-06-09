import { IsInt, IsNumber, IsNumberString } from 'class-validator';

export class NoteGetDto {
  @IsNumberString()
  id: number;
}
