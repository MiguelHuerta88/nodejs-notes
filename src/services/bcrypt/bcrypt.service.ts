import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  /**
   * Hash string using BCrypt
   * @param plainStr
   * @return Promise<string>
   */
  public async hash(plainStr: string): Promise<string> {
    return await bcrypt.hash(plainStr, 10);
  }

  /**
   * Compare password to hashed string
   * @param plainStr
   * @param hashedPass
   * @return Promise<boolean>
   */
  public async compare(plainStr: string, hashedPass: string): Promise<boolean> {
    return await bcrypt.compare(plainStr, hashedPass);
  }
}
