import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { TypeOrmExModule } from 'common/typeorm-ex.module';
import { UserRepository } from './user.repository';
import { UsersService } from './users.service';
import { ClientRepository } from 'src/clients/client.repository';
// import { UserRepository } from './user.repository';
// import { ClientRepository } from 'src/clients/client.repository';
// import { Client } from 'src/clients/client.entity';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository, ClientRepository]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
