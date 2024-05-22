import { Type, plainToInstance } from 'class-transformer';
import { IsNumber, IsOptional, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  // General

  @IsString()
  @IsOptional()
  NODE_ENV?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  PORT?: number;

  // Database

  @IsString()
  DATABASE_HOST: string;

  @IsString()
  DATABASE_USERNAME: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsNumber()
  @Type(() => Number)
  DATABASE_PORT: string;

  @IsString()
  DATABASE_NAME: string;

  // Jwt

  @IsString()
  JWT_ACCESS_SECRET: string;

  @IsString()
  JWT_ACCESS_EXPIRE: string;

  // microservice

  @IsString()
  @IsOptional()
  AUTH_MICROSERVICE_URL?: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
