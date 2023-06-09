import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfigService } from '../../services/config/env-config.service';
import { NotesConfigModule } from '../../services/config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [NotesConfigModule],
      inject: [EnvConfigService],
      useFactory: (configService: EnvConfigService) => ({
        // connecting to mysql local. using mysql brew install. We will move to docker after working
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'notes',
        entities: [configService.getSrcPath() + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class TypeormModule {}
