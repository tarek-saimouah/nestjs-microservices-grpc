import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ type: Date })
  readonly createdAt: Date;

  @ApiProperty({ type: Date })
  readonly updatedAt: Date;
}
