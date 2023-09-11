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

  async getAllClients(): Promise<any> {
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

      await queryRunner.manager
        .withRepository(this.clientsRepository)
        .save(client, { transaction: false });

      // 에러 throw 시에 commit 이전 내역이 저장되지 않음을 확인할 수 있음
      // throw new Error('에러 테스트');
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
