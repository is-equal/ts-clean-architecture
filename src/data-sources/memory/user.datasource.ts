import type { UserRepository } from '../../core/user/user.repository';
import type { User } from '../../core/user/user';
import { UserInvalidError } from '../../core/user/error/user-invalid.error';

export class MemoryUserDataSource implements UserRepository {
  private users: User[] = [];

  filterByConditions(user: User) {
    return (condition?: FindConditions<User>) => {
      let cond = true;

      if (condition?.id) {
        cond = cond && user.id === condition?.id;
      }

      return cond;
    };
  }

  async find(conditions?: FindManyOptions<User>): Promise<User[]> {
    return this.users.filter((user: User): boolean => {
      if (Array.isArray(conditions?.where)) {
        return conditions?.where.map(this.filterByConditions(user)).some((cond) => cond) ?? true;
      } else {
        return this.filterByConditions(user)(conditions?.where);
      }
    });
  }

  async findOne(conditions?: FindOneOptions<User>): Promise<User | undefined> {
    return this.users.find((user: User): boolean => {
      if (Array.isArray(conditions)) {
        return conditions.map(this.filterByConditions(user)).some((cond) => cond);
      } else {
        return this.filterByConditions(user)(conditions);
      }
    });
  }

  async save(user: DeepPartial<User>): Promise<User> {
    if (user.id) {
      let userData = await this.findOne({ id: user.id });

      if (!userData) {
        throw new UserInvalidError(`invalid user(${user.id})`);
      }

      userData = user as User;

      return userData;
    }

    user.id = new Date().getTime().toString();
    user.createdAt = new Date().toISOString();

    this.users.push(user as User);

    return user as User;
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
