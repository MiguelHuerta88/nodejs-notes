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

  /**
   * Find user by email
   * @param email
   * @return Promise<Users|null>
   */
  public async findUserByEmail(email: string): Promise<Users | null> {
    return await this.usersRepository.findOneBy({ email: email });
  }

  /**
   * Update user record
   * @param user
   * @return Promise<Users>
   */
  public async updateUser(user: Users): Promise<Users> {
    return await this.usersRepository.save(user);
  }
}
