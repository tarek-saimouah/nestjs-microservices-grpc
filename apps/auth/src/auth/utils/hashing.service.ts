import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class HashingService {
  constructor() {}

  async hash(str: string): Promise<string> {
    return await argon2.hash(str);
  }

  async compare(hash: string, plain: string): Promise<boolean> {
    const match = await argon2.verify(hash, plain);
    return match;
  }
}
