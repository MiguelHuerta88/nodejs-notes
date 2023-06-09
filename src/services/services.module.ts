import { Module } from '@nestjs/common';
import { NotesConfigModule } from './config/config.module';
import { EnvConfigService } from './config/env-config.service';
import { AppService } from './app.service';

@Module({
  imports: [NotesConfigModule],
  exports: [EnvConfigService, AppService],
  providers: [EnvConfigService, AppService],
})
export class ServicesModule {}
