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
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { Notes } from '../models/entities/notes.entity';
import { NoteGetDto } from './dtos/note.get.dto';
import { NotePatchDto } from './dtos/note.patch.dto';
import { NotePostDto } from './dtos/note.post.dto';
import { AuthGuard } from '../guard/auth.guard';
import { NoteModel } from '../models/domain/note';

@Controller('api/notes')
@UseGuards(AuthGuard)
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @Post()
  public async createNote(
    @Body() note: NotePostDto,
    @Request() request,
  ): Promise<NoteModel> {
    const noteModel = new NoteModel(
      null,
      note.title,
      note.notes,
      request.user.sub,
    );

    return await this.noteService.save(noteModel);
  }

  @Get()
  public async findAll(@Request() request): Promise<NoteModel[]> {
    return await this.noteService.findAllByUser(request.user.sub);
  }

  @Get(':id')
  public async findNote(
    @Param() noteDto: NoteGetDto,
    @Request() request,
  ): Promise<NoteModel | null> {
    const locatedNote = await this.noteService.findNoteById(
      noteDto.id,
      request.user.sub,
    );

    if (!locatedNote)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    return locatedNote;
  }

  @Patch(':id')
  @HttpCode(204)
  public async patchNote(
    @Param() getNote: NoteGetDto,
    @Body() noteDto: NotePatchDto,
    @Request() request,
  ): Promise<void> {
    // first find the note we are trying to update
    const locatedNote = await this.noteService.findNoteById(
      getNote.id,
      request.user.sub,
    );

    // if nothing found, return 404
    if (!locatedNote)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    // update note with data
    await this.noteService.updateNote(getNote.id, noteDto);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteNote(@Param() noteDto: NoteGetDto, @Request() request) {
    // find note to check if it was already deleted
    const noteToDelete = await this.noteService.findNoteById(
      noteDto.id,
      request.user.sub,
    );

    if (!noteToDelete)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    await this.noteService.deleteNote(noteDto.id);
  }
}
