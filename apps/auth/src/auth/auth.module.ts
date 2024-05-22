import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { HashingService, JwtServiceUtils } from './utils';
import { JwtModule } from '@nestjs/jwt';
import { AuthGrpcController } from './auth.grpc.controller';

@Module({
  imports: [JwtModule.register({}), UsersModule],
  controllers: [AuthController, AuthGrpcController],
  providers: [AuthService, JwtServiceUtils, HashingService],
})
export class AuthModule {}
