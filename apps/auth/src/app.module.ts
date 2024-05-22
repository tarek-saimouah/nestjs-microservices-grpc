import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
      envFilePath: './apps/auth/.env',
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
