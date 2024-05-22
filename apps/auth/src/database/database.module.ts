import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        database: configService.get('DATABASE_NAME'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        migrationsTableName: 'typeorm_migrations',
        synchronize: false,
        entities: [User],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
