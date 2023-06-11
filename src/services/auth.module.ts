import { Module } from '@nestjs/common';
import { JwtNoteModule } from './jwt/jwt.module';
import { NotesConfigModule } from './config/config.module';
import { JwtService } from '@nestjs/jwt';
import { EnvConfigService } from './config/env-config.service';

@Module({
  imports: [JwtNoteModule, NotesConfigModule],
  exports: [JwtService, EnvConfigService],
  providers: [JwtService, EnvConfigService],
})
export class AuthModule {}
