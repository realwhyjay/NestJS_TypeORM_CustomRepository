import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { ClientRepository } from 'src/clients/client.repository';
import { Client } from 'src/clients/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Client])],
  providers: [UsersService, UserRepository, ClientRepository],
  exports: [UserRepository],
  controllers: [UsersController],
})
export class UsersModule {}
