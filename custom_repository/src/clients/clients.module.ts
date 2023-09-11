import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'common/typeorm-ex.module';
import { UserRepository } from 'src/users/user.repository';

import { ClientRepository } from './client.repository';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([ClientRepository, UserRepository]),
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
