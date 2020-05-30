import { UserRepository } from '../../core/user/user.repository';
import { User } from '../../core/user/user';
import { getRepository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

export class UserDataSource implements UserRepository {
  private readonly repository = getRepository(UserEntity);

  find(conditions?: FindManyOptions<User>): Promise<User[]> {
    return this.repository.find({ where: conditions });
  }

  findOne(conditions?: FindOneOptions<User>): Promise<User | undefined> {
    return this.repository.findOne({ where: conditions });
  }

  save(data: DeepPartial<User>): Promise<User> {
    return this.repository.save(data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete({ id });
  }
}
