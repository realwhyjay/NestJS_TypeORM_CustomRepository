import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UserRepository } from 'src/users/user.repository';
import { DataSource } from 'typeorm';
import { ClientRepository } from './client.repository';

@Injectable()
export class ClientsService {
  constructor(
    private clientsRepository: ClientRepository,
    private usersRepository: UserRepository,
    private dataSource: DataSource,
  ) {}

  async getAllClients() {
    const clients = await this.clientsRepository.find();
    return clients;
  }

  async createClient(body: { name: string; user_id: number; age: number }) {
    try {
      const { name, age, user_id } = body;

      const user = await this.usersRepository.findOne({
        where: { id: user_id },
      });
      const client = this.clientsRepository.create({ name, age });
      client.user = user;

      await this.clientsRepository.save(client);
      return client;
    } catch (error) {
      throw error;
    }
  }

  async createClientWithTransaction(body: {
    name: string;
    user_id: number;
    age: number;
  }) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { name, age, user_id } = body;

      const user = await this.usersRepository.findOne({
        where: { id: user_id },
      });
      const client = this.clientsRepository.create({ name, age });
      client.user = user;

      await this.clientsRepository.save(client, { transaction: false });
      // 와  { transaction: false } 옵션을 사용하니까 다른 repository의 method들을 하나의 transaction에서 사용할 수 있잖아?
      // 그런데 문제는 안되는 method들도 많다는거임;;;
      // ueserService의 deleteUser 보면 알 수 있음
      // { transaction: false }같은 saveOptions들은 typeORM의 여러 method 중에 save, remove 계열의 method에만 적용시킬 수 있다.
      // 그러니까 이 방식으로는 힘들다...
      throw Error('야호');
      await queryRunner.commitTransaction();

      return client;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
