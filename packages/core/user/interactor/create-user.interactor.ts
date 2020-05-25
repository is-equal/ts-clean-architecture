import type { UserRepository } from '../user.repository';
import type { Presenter } from '../../common/presenter';
import { Validator } from '../../common/validator';
import { UserUsernameInvalidError } from '../error/user-username-invalid.error';
import { UserPasswordInvalidError } from '../error/user-password-invalid.error';
import { CreateUserResponse } from '../dto/create-user.response';
import { CreateUserRequest } from '../dto/create-user.request';

export class CreateUserInteractor {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly presenter: Presenter<CreateUserResponse>,
    private readonly validator: Validator,
  ) {}

  async execute(data: CreateUserRequest): Promise<void> {
    try {
      // Input data validations
      if (!this.validator.isUsername(data.username)) {
        throw new UserUsernameInvalidError('invalid username');
      }
      if (!this.validator.isPassword(data.password)) {
        throw new UserPasswordInvalidError('invalid password');
      }

      // Data persistence
      const user = await this.userRepository.save(data);

      // Presenter success response
      await this.presenter.reply({
        id: user.id,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
      });
    } catch (error) {
      // Presenter error response
      await this.presenter.throw(error);
    }
  }
}
