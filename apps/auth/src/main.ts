import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from '@app/grpc';

async function bootstrap() {
  // create hybrid app

  // create http server
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // connect microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      protoPath: join(__dirname, '../../../libs/grpc/src/proto/auth.proto'),
      package: AUTH_PACKAGE_NAME,
      url: process.env.AUTH_MICROSERVICE_URL || 'localhost:5000',
    },
  });

  // validator config

  const validatorOptions = {
    whitelist: true,
    transform: true,
    exceptionFactory: (errors: ValidationError[]) => {
      return new HttpException(errors, HttpStatus.NOT_ACCEPTABLE);
    },
  };
  app.useGlobalPipes(new ValidationPipe(validatorOptions));

  // versioning => default for all controllers 'v1'
  // enable versioning must be called before swagger config
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // swagger config

  const config = new DocumentBuilder()
    .setTitle('Auth microservice Api')
    .setDescription('REST api for microservices project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // cors config

  const ORIGIN = process.env.ORIGIN || '*';
  app.enableCors({ origin: ORIGIN });

  const PORT = process.env.PORT || 3001;

  await app.startAllMicroservices();
  await app.listen(PORT);
}
bootstrap();
