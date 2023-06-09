import { Injectable } from '@nestjs/common';
import { Notes } from '../models/entities/notes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnvConfigService } from './config/env-config.service';

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
   * Find Note By Id
   * @param id
   * @return Promise<Notes|null>
   */
  public async findNoteById(id: number): Promise<Notes | null> {
    return await this.notesRespository.findOneBy({ id: id });
  }
}
