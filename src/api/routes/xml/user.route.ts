import xml from 'fast-xml-parser';
import { FastifyInstance } from 'fastify';
import { CreateUserXMLPresenter } from '../../../adapters/fastify/create-user-xml.presenter';
import { CustomValidator } from '../../../adapters/validator';
import { CreateUserInteractor } from '../../../core/user/interactor/create-user.interactor';
import { CreateUserRequest } from '../../../core/user/dto/create-user.request';
import { UserDataSource } from '../../../data-sources/database/user.datasource';
import { CustomSecurity } from '../../../adapters/security/security';

export default function (server: FastifyInstance, options: any, done: any): void {
  const repository = new UserDataSource();
  const validator = new CustomValidator();
  const security = new CustomSecurity();

  server.post('/', async function (request, reply) {
    const presenter = new CreateUserXMLPresenter(reply);
    const interactor = new CreateUserInteractor(repository, presenter, validator);

    // Transform XML to JSON
    const { user } = xml.parse(request.body);

    // Create a Request DTO
    const data: CreateUserRequest = {
      username: user.username,
      password: security.encryptPassword(user.password)
    };

    // Execute Interactor and Presenter
    await interactor.execute(data);
  });

  done();
}
