import { Module } from '@nestjs/common';
import { ServicesModule } from './services/services.module';
import { ControllersModule } from './controllers/controllers.module';
@Module({
  imports: [ServicesModule, ControllersModule],
})
export class AppModule {}
