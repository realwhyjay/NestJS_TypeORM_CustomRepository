import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { DataSource, In } from 'typeorm';
import { ClientRepository } from 'src/clients/client.repository';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UserRepository,
    private clientsRepository: ClientRepository,
    private dataSource: DataSource,
  ) {}

  async getAllUsers(): Promise<any> {
    const users = await this.usersRepository.find();
    return users;
  }
  async createUser(body: { name: string; age: number }) {
    try {
      const { name, age } = body;

      const user = await this.usersRepository.create({ name, age });
      await this.usersRepository.save(user);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(body: { user_id: number }) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { user_id } = body;

      await queryRunner.manager
        .withRepository(this.usersRepository)
        .softDelete({ id: user_id });

      const clientIds = await this.clientsRepository.getClientIds({
        user: { id: user_id },
      });

      await queryRunner.manager
        .withRepository(this.clientsRepository)
        .softDelete({ id: In(clientIds) });

      await queryRunner.commitTransaction();
      return;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
