import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { NotesConfigModule } from '../config/config.module';
import { EnvConfigService } from '../config/env-config.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
  ],
})
export class JwtNoteModule {}
