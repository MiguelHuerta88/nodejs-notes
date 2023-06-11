import { Module } from '@nestjs/common';
import { ServicesModule } from '../services/services.module';
import { AppController } from './app.controller';
import { NotesController } from './notes.controller';
import { AuthController } from './auth.controller';

@Module({
  imports: [ServicesModule],
  controllers: [AppController, NotesController, AuthController],
})
export class ControllersModule {}
