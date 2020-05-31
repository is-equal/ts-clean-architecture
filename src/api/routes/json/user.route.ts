import { FastifyInstance } from 'fastify';
import { CustomValidator } from '../../../adapters/validator';
import { CreateUserInteractor } from '../../../core/user/interactor/create-user.interactor';
import { CreateUserJSONPresenter } from '../../../adapters/fastify/create-user-json.presenter';
import { CreateUserRequest } from '../../../core/user/dto/create-user.request';
import { UserDataSource } from '../../../data-sources/database/user.datasource';
import { CustomSecurity } from '../../../adapters/security/security';

export default function (server: FastifyInstance, options: any, done: any): void {
  const repository = new UserDataSource();
  const validator = new CustomValidator();
  const security = new CustomSecurity();

  server.post('/', async function (request, reply) {
    const presenter = new CreateUserJSONPresenter(reply);
    const interactor = new CreateUserInteractor(repository, presenter, validator);

    // Create a Request DTO
    const data: CreateUserRequest = {
      username: request.body.username,
      password: security.encryptPassword(request.body.password)
    };

    // Execute Interactor and Presenter
    await interactor.execute(data);
  });

  done();
}
