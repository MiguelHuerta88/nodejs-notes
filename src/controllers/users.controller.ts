import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Users } from '../models/entities/users.entity';
import { UserPostDto } from './dtos/user.post.dto';
import { UsersService } from '../services/users.service';
import { BcryptService } from '../services/bcrypt/bcrypt.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly bcryptService: BcryptService,
  ) {}

  @Post('register')
  @HttpCode(200)
  public async register(@Body() userDto: UserPostDto): Promise<Users> {
    // hash password
    const passHash = await this.bcryptService.hash(userDto.password);

    if (!passHash)
      throw new HttpException(
        'Error hashing password',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    userDto.password = passHash;

    const user = await this.userService.createUser(userDto);

    if (!user)
      throw new HttpException(
        'Error Creating',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return user;
  }
}
