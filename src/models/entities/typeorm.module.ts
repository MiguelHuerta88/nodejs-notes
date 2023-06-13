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
        host: configService.getDatabaseHost(),
        port: 3306,
        username: configService.getDatabaseUser(),
        password: configService.getDatabasePassword(),
        database: configService.getDatabaseName(),
        entities: [configService.getSrcPath() + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class TypeormModule {}
