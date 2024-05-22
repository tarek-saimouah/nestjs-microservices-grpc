import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserResponseDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(payload: CreateUserDto): Promise<UserResponseDto> {
    const user = this.usersRepository.create(payload);
    const created = await this.usersRepository.save(user);

    return created;
  }

  async exists(email: string): Promise<boolean> {
    return await this.usersRepository.exists({ where: { email } });
  }

  async getById(userId: string): Promise<UserResponseDto | null> {
    const user = await this.usersRepository.findOne({ where: { userId } });

    if (!user) {
      return null;
    }

    return user;
  }

  async findWithPassword(
    email: string,
  ): Promise<(UserResponseDto & { password: string }) | null> {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: {
        userId: true,
        email: true,
        firstName: true,
        lastName: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
