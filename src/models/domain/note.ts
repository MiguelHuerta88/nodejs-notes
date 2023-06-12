export class NoteModel {
  private id: number;
  private title: string;
  private notes: string;
  private userId: number;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: number = null,
    title: string = null,
    notes: string = null,
    userId: number = null,
    createdAt: Date = null,
    updatedAt: Date = null,
  ) {
    this.id = id;
    this.title = title;
    this.notes = notes;
    this.userId = userId;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getId(): number | null {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getTitle(): string | null {
    return this.title;
  }

  public setTitle(title: string) {
    this.title = title;
  }

  public getNotes(): string | null {
    return this.notes;
  }

  public setNotes(notes: string) {
    this.notes = notes;
  }

  public getUserId(): number | null {
    return this.userId;
  }

  public setUserId(userId: number) {
    this.userId = userId;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setCreatedAt(createdAt: Date) {
    this.createdAt = createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setUpdatedAt(updatedAt: Date) {
    this.updatedAt = updatedAt;
  }
}
