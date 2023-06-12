import { Injectable } from '@nestjs/common';
import { Notes } from '../models/entities/notes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotePatchDto } from '../controllers/dtos/note.patch.dto';
import { NotePostDto } from '../controllers/dtos/note.post.dto';
import { NoteModel } from '../models/domain/note';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Notes)
    private readonly notesRespository: Repository<Notes>,
  ) {}

  /**
   * Find all notes related to this user only
   * @param userId
   * @return Promise<NoteModel[]>
   */
  public async findAllByUser(userId: number): Promise<NoteModel[]> {
    return (await this.notesRespository.findBy({ userId: userId })).map(
      (note) =>
        new NoteModel(
          note.id,
          note.title,
          note.notes,
          note.userId,
          note.createdAt,
          note.updatedAt,
        ),
    );
  }

  public async findAll(): Promise<NoteModel[]> {
    return (await this.notesRespository.find()).map(
      (note) =>
        new NoteModel(
          note.id,
          note.title,
          note.notes,
          note.userId,
          note.createdAt,
          note.updatedAt,
        ),
    );
  }

  /**
   * Create Note and return entity back
   * @param note
   * @return Promise<Notes>
   */
  public async save(note: NoteModel): Promise<NoteModel> {
    const noteEntity = new Notes();
    noteEntity.id = note.getId();
    noteEntity.title = note.getTitle();
    noteEntity.notes = note.getNotes();
    noteEntity.createdAt = note.getCreatedAt();
    noteEntity.updatedAt = note.getUpdatedAt();
    noteEntity.userId = note.getUserId();

    const createdNote = await this.notesRespository.save(noteEntity);

    // convert to model
    return new NoteModel(
      createdNote.id,
      createdNote.title,
      createdNote.notes,
      createdNote.userId,
      createdNote.createdAt,
      createdNote.updatedAt,
    );
  }

  /**
   * Find Note By Id
   * @param id
   * @param userId
   * @return Promise<Notes|null>
   */
  public async findNoteById(
    id: number,
    userId: number,
  ): Promise<NoteModel | null> {
    const note = await this.notesRespository.findOneBy({
      id: id,
      userId: userId,
    });

    return note
      ? new NoteModel(
          note.id,
          note.title,
          note.notes,
          note.userId,
          note.createdAt,
          note.updatedAt,
        )
      : null;
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
