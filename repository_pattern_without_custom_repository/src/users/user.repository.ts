import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getUserIds() {
    return this.repository.find({ select: { id: true, name: true } });
  }

  async userDelete(user_id: number) {
    await this.repository.update({ id: user_id }, { deleted_at: new Date() });
    return;
  }
}
