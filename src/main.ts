import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EnvConfigService } from './services/config/env-config.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(EnvConfigService);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.getPort());
}
bootstrap();
