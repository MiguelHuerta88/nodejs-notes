import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { Notes } from '../models/entities/notes.entity';
import { NoteGetDto } from './dtos/note.get.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @Get()
  public async findAll(): Promise<Notes[]> {
    return await this.noteService.findAll();
  }

  @Get(':id')
  public async findNote(@Param() noteDto: NoteGetDto): Promise<Notes | null> {
    console.log('here we are');
    console.log(noteDto);
    const locatedNote = await this.noteService.findNoteById(noteDto.id);

    if (!locatedNote)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    return locatedNote;
  }
}
