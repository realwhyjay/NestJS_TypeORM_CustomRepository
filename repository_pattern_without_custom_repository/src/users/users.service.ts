import { Injectable } from '@nestjs/common';
import { ClientRepository } from 'src/clients/client.repository';
import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UserRepository,
    private clientsRepository: ClientRepository,
    private dataSource: DataSource,
  ) {}

  async getAllUsers() {
    const users = await this.usersRepository.getUserIds();
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

      // await this.usersRepository.userDelete(user_id);

      // await queryRunner.manager.softDelete(User, { id: user_id });
      // UserRepository에서 생성한 method를 사용할 수가 없다

      // await this.usersRepository.softRemove(
      //   { id: user_id },
      //   { transaction: false },
      // );
      // 위 처럼 사용은 할 수 있는데, 제대로 동작하지 않음
      // await queryRunner.manager.softDelete(UserRepository, { id: user_id });

      throw Error('야호');

      await this.clientsRepository.softDelete({ user: { id: user_id } });
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
