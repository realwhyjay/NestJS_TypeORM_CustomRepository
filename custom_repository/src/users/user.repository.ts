import { CustomRepository } from 'common/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async getUserIds(): Promise<any> {
    return await this.find({ select: { id: true, name: true } });
  }
}
