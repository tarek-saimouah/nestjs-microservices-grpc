import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 8 })
  @MinLength(8, { message: 'password must be at least 8 charachters long' })
  @IsString()
  password: string;
}
