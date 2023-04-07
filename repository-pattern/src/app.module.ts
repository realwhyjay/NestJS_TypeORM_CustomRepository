import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'common/config/typeOrmConfig';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRoot(typeORMConfig),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
