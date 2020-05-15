import type { UserRepository } from '../../core/user/user.repository';
import type { User } from '../../core/user/user';

export class MemoryUserDataSource implements UserRepository {
  private users = [];

  async find(conditions?: FindManyOptions<User>): Promise<User[]> {
    return [];
  }
  async findOne(conditions?: FindOneOptions<User>): Promise<User | undefined> {
    return;
  }
  async save(data: DeepPartial<User>): Promise<User> {
    return {} as User;
  }
  async delete(id: string): Promise<void> {}
}
