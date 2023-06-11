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
import { JwtService } from '@nestjs/jwt';
import { EnvConfigService } from '../services/config/env-config.service';
import { UserLogoutDto } from './dtos/user.logout.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly envConfigService: EnvConfigService,
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

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  public async logout(@Body() jwtDto: UserLogoutDto): Promise<void> {
    // verify
    try {
      const payload = await this.jwtService.verifyAsync(jwtDto.jwtToken, {
        secret: this.envConfigService.getJwtSecret(),
      });

      // search for the user and clear the tokens on logout
      const user = await this.userService.findUserByEmail(payload.email);

      if (!user)
        throw new HttpException(
          'No User Record',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );

      // update user removing tokens
      user.token = null;
      user.refreshToken = null;
      await this.userService.updateUser(user);
    } catch (err) {
      // error verifying return error
      throw new HttpException(
        'Verification failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDto: UserLoginDto): Promise<JwtModel> {
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
    const payload = { sub: user.id, username: user.email };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: this.envConfigService.getJwtTokenTime(),
      secret: this.envConfigService.getJwtSecret(),
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.envConfigService.getJwtTokenTime(),
      secret: this.envConfigService.getJwtTokenRefreshTime(),
    });

    // set them on user and save
    user.refreshToken = refreshToken;
    user.token = token;

    await this.userService.updateUser(user);

    return new JwtModel(token, refreshToken);
  }
}
