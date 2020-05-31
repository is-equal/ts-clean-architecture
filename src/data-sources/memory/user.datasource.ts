import type { UserRepository } from '../../core/user/user.repository';
import type { User } from '../../core/user/user';
import { UserInvalidError } from '../../core/user/error/user-invalid.error';

export class MemoryUserDataSource implements UserRepository {
  private users: User[] = [];

  filterByConditions(user: User) {
    return (condition?: FindConditions<User>) => {
      let cond = true;

      if (condition?.id !== undefined) {
        cond = cond && user.id === condition?.id;
      }

      return cond;
    };
  }

  find(conditions?: FindManyOptions<User>): Promise<User[]> {
    const data = this.users.filter((user: User): boolean => {
      if (Array.isArray(conditions?.where)) {
        return conditions?.where.map(this.filterByConditions(user)).some((cond) => cond) ?? true;
      } else {
        return this.filterByConditions(user)(conditions?.where);
      }
    });

    return Promise.resolve(data);
  }

  findOne(conditions?: FindOneOptions<User>): Promise<User | undefined> {
    const data = this.users.find((user: User): boolean => {
      if (Array.isArray(conditions)) {
        return conditions.map(this.filterByConditions(user)).some((cond) => cond);
      } else {
        return this.filterByConditions(user)(conditions);
      }
    });

    return Promise.resolve(data);
  }

  async save(user: DeepPartial<User>): Promise<User> {
    if (user.id !== undefined) {
      let userData = await this.findOne({ id: user.id });

      if (userData !== undefined) {
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

  delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);

    return Promise.resolve();
  }
}
