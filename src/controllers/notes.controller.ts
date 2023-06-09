import { Controller, Get } from '@nestjs/common';

@Controller('notes')
export class NotesController {
  @Get()
  findAll(): string {
    return 'Miguel we hit the endpoint';
  }
}
