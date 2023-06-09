import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { Notes } from '../models/entities/notes.entity';
import { NoteGetDto } from './dtos/note.get.dto';
import { NotePatchDto } from './dtos/note.patch.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @Get()
  public async findAll(): Promise<Notes[]> {
    return await this.noteService.findAll();
  }

  @Get(':id')
  public async findNote(@Param() noteDto: NoteGetDto): Promise<Notes | null> {
    const locatedNote = await this.noteService.findNoteById(noteDto.id);

    if (!locatedNote)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    return locatedNote;
  }

  @Patch(':id')
  @HttpCode(204)
  public async patchNote(
    @Param() getNote: NoteGetDto,
    @Body() noteDto: NotePatchDto,
  ): Promise<void> {
    // first find the note we are trying to update
    const locatedNote = await this.noteService.findNoteById(getNote.id);

    // if nothing found, return 404
    if (!locatedNote)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    // update note with data
    await this.noteService.updateNote(getNote.id, noteDto);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteNote(@Param() noteDto: NoteGetDto) {
    // find note to check if it was already deleted
    const noteToDelete = await this.noteService.findNoteById(noteDto.id);

    if (!noteToDelete)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    await this.noteService.deleteNote(noteDto.id);
  }
}
