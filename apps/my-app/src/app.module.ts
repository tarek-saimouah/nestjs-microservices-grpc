import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validateEnv } from './common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME, RPC_AUTH_SERVICE_NAME } from '@app/grpc';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
      envFilePath: './apps/my-app/.env',
    }),

    // register auth grpc microservice
    ClientsModule.registerAsync([
      {
        name: RPC_AUTH_SERVICE_NAME,
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: AUTH_PACKAGE_NAME,
            protoPath: join(
              __dirname,
              '../../../libs/grpc/src/proto/auth.proto',
            ),
            url:
              configService.get<string>('AUTH_MICROSERVICE_URL') ||
              'localhost:5000',
          },
        }),
        imports: [ConfigModule],
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
