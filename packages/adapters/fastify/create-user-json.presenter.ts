import type { FastifyReply } from 'fastify';
import type { Presenter } from '../../core/common/presenter';
import { CreateUserResponse } from '../../core/user/dto/create-user.response';
import { UserPasswordInvalidError } from '../../core/user/error/user-password-invalid.error';
import { UserUsernameInvalidError } from '../../core/user/error/user-username-invalid.error';
import { isInstanceOf } from '../../core/utils/instanceof.util';

export class CreateUserJSONPresenter implements Presenter<CreateUserResponse> {
  constructor(private readonly res: FastifyReply<any>) {}

  async reply(data: CreateUserResponse): Promise<void> {
    // Trasform DTO to Custom Format
    const responseJSON = { username: data.username };

    // Send data
    this.res.status(201).send(responseJSON);
  }

  async throw(error: Error): Promise<void> {
    if (
      isInstanceOf(error, [UserUsernameInvalidError, UserPasswordInvalidError])
    ) {
      // Format exception
      const responseJSON = {
        statusCode: 400,
        error: { message: error.message },
      };

      // Send data
      this.res.status(400).send(responseJSON);
    }

    // Format exception
    const responseJSON = {
      statusCode: 500,
      error: { message: 'Internal Server Error', details: error.stack },
    };

    // Send data
    this.res.status(500).send(responseJSON);
  }
}
