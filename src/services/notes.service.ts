import { Injectable } from '@nestjs/common';
import { Notes } from '../models/entities/notes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnvConfigService } from './config/env-config.service';
import { NotePatchDto } from '../controllers/dtos/note.patch.dto';
import { uptime } from 'os';
import { NotePostDto } from '../controllers/dtos/note.post.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Notes)
    private readonly notesRespository: Repository<Notes>,
  ) {}

  public async findAll(): Promise<Notes[]> {
    return await this.notesRespository.find();
  }

  public async createDummy(): Promise<void> {
    await this.notesRespository.insert({
      title: 'Miguel First Note',
      notes: 'this is some sample text to tie to this note',
    });
  }

  /**
   * Create Note and return entity back
   * @param note
   * @return Promise<Notes>
   */
  public async save(note: NotePostDto): Promise<Notes> {
    return await this.notesRespository.save(note);
  }

  /**
   * Find Note By Id
   * @param id
   * @return Promise<Notes|null>
   */
  public async findNoteById(id: number): Promise<Notes | null> {
    return await this.notesRespository.findOneBy({ id: id });
  }

  /**
   * Path a note
   * @param id
   * @param updates
   */
  public async updateNote(id: number, updates: NotePatchDto): Promise<boolean> {
    const updated = await this.notesRespository.update({ id: id }, updates);

    return updated.affected > 0;
  }

  public async deleteNote(id: number): Promise<void> {
    await this.notesRespository.delete(id);
  }
}
