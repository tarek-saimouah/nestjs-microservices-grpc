import { Injectable } from '@nestjs/common';
import { MessageResponseDto } from './dto';
import { JwtDecodedEntity } from '@app/common';

@Injectable()
export class AppService {
  getHello(user: JwtDecodedEntity): MessageResponseDto {
    return {
      message: `Hello ${user.email}`,
    };
  }
}
