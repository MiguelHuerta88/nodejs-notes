import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';

@Module({
  imports: [],
  exports: [BcryptService],
  providers: [BcryptService],
})
export class BcryptModule {}
