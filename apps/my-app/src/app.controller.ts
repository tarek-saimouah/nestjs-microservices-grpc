import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MessageResponseDto } from './dto';
import { DecodedUser, JwtGuard } from '@app/common';
import { JwtDecodedEntity } from '@app/common';

@ApiTags('app')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'returns a string "hello ${decodedUser.email}"',
  })
  @ApiResponse({ type: MessageResponseDto })
  @ApiBearerAuth()
  // permissions
  @UseGuards(JwtGuard)
  @Get('hello')
  getHello(@DecodedUser() decodedUser: JwtDecodedEntity): MessageResponseDto {
    return this.appService.getHello(decodedUser);
  }
}
