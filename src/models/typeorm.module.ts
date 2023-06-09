import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfigService } from '../services/config/env-config.service';
import { NotesConfigModule } from '../services/config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [NotesConfigModule],
      inject: [EnvConfigService],
      useFactory: (configService: EnvConfigService) => ({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        synchronize: true,
        entities: [configService.getSrcPath() + '/**/*.entity{ts.js}'],
      }),
    }),
  ],
})
export class TypeormModule {}
