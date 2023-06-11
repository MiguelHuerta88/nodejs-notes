import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../models/entities/users.entity';
import { Repository } from 'typeorm';
import { BcryptService } from './bcrypt/bcrypt.service';
import { UserPostDto } from '../controllers/dtos/user.post.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  /**
   * Create user
   * @param userDto
   * @return Promise<User | null>
   */
  public async createUser(userDto: UserPostDto): Promise<Users | null> {
    // create user
    return await this.usersRepository.save(userDto);
  }
}
