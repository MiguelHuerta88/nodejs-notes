import { ConfigInterface } from './config.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

@Injectable()
export class EnvConfigService implements ConfigInterface {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Get Src Path
   * @return string
   */
  public getSrcPath(): string {
    return path.resolve(__dirname, '../../');
  }

  /**
   * Get database port
   * @return number
   */
  public getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  /**
   * Get App URL
   * @return string
   */
  public getAppUrl(): string {
    return this.configService.get<string>('APP_URL');
  }

  /**
   * Get App port
   * @return number
   */
  public getPort(): number {
    return this.configService.get<number>('APP_PORT');
  }

  public getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  public getJwtTokenRefreshTime(): string {
    return this.configService.get<string>('JWT_TOKEN_REFRESH_TIME');
  }

  public getJwtTokenTime(): string {
    return this.configService.get<string>('JWT_TOKEN_TIME');
  }

  public getJwtAlgorithm(): string {
    return this.configService.get<string>('JWT_ALRORITHM');
  }
}
