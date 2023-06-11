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
import { UserLoginDto } from './dtos/user.login.dto';
import { JwtModel } from '../models/utils/jwt';

@Controller('auth')
export class AuthController {
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

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDto: UserLoginDto): Promise<void> {
    // pull user
    const user = await this.userService.findUserByEmail(loginDto.email);

    if (!user)
      throw new HttpException('User Error', HttpStatus.INTERNAL_SERVER_ERROR);

    // compare password
    if (!(await this.bcryptService.compare(loginDto.password, user.password)))
      throw new HttpException(
        'Invalid Password',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    // generate tokens
    // setup model
    // return
  }
}
