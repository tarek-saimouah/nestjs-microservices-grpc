import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: __dirname + '/../../.env' });

const config: DataSourceOptions & { cli: any } = {
  type: 'postgres',
  host: `${process.env.DATABASE_HOST}`,
  port: Number(`${process.env.DATABASE_PORT}`),
  username: `${process.env.DATABASE_USERNAME}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsTableName: 'typeorm_migrations',
  cli: {
    migrationsDir: __dirname + '/migrations',
  },
  entities: [__dirname + '/models/*.model.{ts,js}'],
  synchronize: false,
};

export const connectionSource = new DataSource(config as DataSourceOptions);
