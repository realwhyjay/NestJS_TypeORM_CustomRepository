import { ConfigModule } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

ConfigModule.forRoot({ envFilePath: `.env` });

console.log(`[🔥DB Connected - ${process.env.DB_DB}] `);

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: process.env.DB_HOST,
  port: 3306,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USER,
  database: process.env.DB_DB,
  entities: [__dirname + '/../../**/*.entity.{js,ts}'],
  synchronize: true,
  // migrationsRun: true,
  logging: true,
  timezone: 'Z',
};
