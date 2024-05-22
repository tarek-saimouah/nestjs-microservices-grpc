import { Injectable } from '@nestjs/common';
import { MessageResponseDto } from './dto';
import { JwtDecodedEntity } from '@app/grpc';

@Injectable()
export class AppService {
  getHello(user: JwtDecodedEntity): MessageResponseDto {
    return {
      message: `Hello ${user.email}`,
    };
  }
}
