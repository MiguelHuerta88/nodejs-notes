import { Module } from '@nestjs/common';
import { NotesConfigModule } from './config/config.module';
import { EnvConfigService } from './config/env-config.service';
import { AppService } from './app.service';
import { TypeormModule } from '../models/entities/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notes } from '../models/entities/notes.entity';
import { NotesService } from './notes.service';

@Module({
  imports: [
    NotesConfigModule,
    TypeormModule,
    TypeOrmModule.forFeature([Notes]),
  ],
  exports: [EnvConfigService, AppService, NotesService],
  providers: [EnvConfigService, AppService, NotesService],
})
export class ServicesModule {}
