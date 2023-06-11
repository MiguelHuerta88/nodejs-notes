import { Module } from '@nestjs/common';
import { ServicesModule } from '../services/services.module';
import { AppController } from './app.controller';
import { NotesController } from './notes.controller';
import { UsersController } from './users.controller';

@Module({
  imports: [ServicesModule],
  controllers: [AppController, NotesController, UsersController],
})
export class ControllersModule {}
