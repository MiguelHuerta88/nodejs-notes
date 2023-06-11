import { Module } from '@nestjs/common';
import { NotesConfigModule } from './config/config.module';
import { EnvConfigService } from './config/env-config.service';
import { AppService } from './app.service';
import { TypeormModule } from '../models/entities/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notes } from '../models/entities/notes.entity';
import { NotesService } from './notes.service';
import { Users } from '../models/entities/users.entity';
import { UsersService } from './users.service';
import { BcryptService } from './bcrypt/bcrypt.service';

@Module({
  imports: [
    NotesConfigModule,
    TypeormModule,
    TypeOrmModule.forFeature([Notes, Users]),
  ],
  exports: [
    EnvConfigService,
    AppService,
    NotesService,
    UsersService,
    BcryptService,
  ],
  providers: [
    EnvConfigService,
    AppService,
    NotesService,
    UsersService,
    BcryptService,
  ],
})
export class ServicesModule {}
