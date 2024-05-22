import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from 'apps/auth/src/users';

export class SigninResponseDto {
  @ApiProperty({ type: UserResponseDto, nullable: true })
  user?: UserResponseDto;

  @ApiProperty({ nullable: true })
  accessToken?: string;
}
