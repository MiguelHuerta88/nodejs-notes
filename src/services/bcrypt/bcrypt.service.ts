import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  /**
   * Hash string using BCrypt
   * @param plainStr
   */
  public async hash(plainStr: string): Promise<string> {
    return await bcrypt.hash(plainStr, 10);
  }
}
