import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database';

@Module({
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
})
export class UsersModule {}
