import { CreateUserInteractor } from './create-user.interactor';
import { CreateUserResponse } from '../dto/create-user.response';
import { UserPasswordInvalidError } from '../error/user-password-invalid.error';
import { UserUsernameInvalidError } from '../error/user-username-invalid.error';
import { UserRepository } from '../user.repository';
import { Presenter } from '../../common/presenter';
import { Validator } from '../../common/validator';
import { User } from '../user';
import { defineNow, getNowISO } from '../../utils/test.util';

const userRepositoryMock = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

const presenterMock = {
  reply: jest.fn(),
  throw: jest.fn(),
};

const validatorMock = {
  isUsername: jest.fn(),
  isPassword: jest.fn(),
};

describe('CreateUserInteractor', () => {
  let interactor: CreateUserInteractor;

  beforeAll(() => {
    interactor = new CreateUserInteractor(
      userRepositoryMock as UserRepository,
      presenterMock as Presenter<CreateUserResponse>,
      validatorMock as Validator,
    );
  });

  beforeEach(() => {
    validatorMock.isUsername.mockReturnValue(true);
    validatorMock.isPassword.mockReturnValue(true);
  });

  it('should be defined', () => {
    expect(interactor).toBeDefined();
    expect(interactor.execute).toBeDefined();
  });

  it('should create user', async () => {
    defineNow('2020-05-20T00:00:00.000Z');

    userRepositoryMock.save.mockImplementation(
      (data: DeepPartial<User>): User => {
        return {
          ...data,
          id: 'uuid',
          createdAt: getNowISO(),
        } as User;
      },
    );

    await interactor.execute({
      username: 'username',
      password: '123',
    });

    expect(presenterMock.throw).not.toBeCalled();
    expect(presenterMock.reply).toHaveBeenCalledWith({
      id: 'uuid',
      username: 'username',
      createdAt: getNowISO(),
    });
  });

  describe('should error on create user', () => {
    test('with invalid username', async () => {
      validatorMock.isUsername.mockReturnValue(false);

      await interactor.execute({
        username: 'username',
        password: '123',
      });

      expect(presenterMock.reply).not.toBeCalled();
      expect(presenterMock.throw).toBeCalledWithInstanceOf(
        UserUsernameInvalidError,
      );
    });

    test('with invalid password', async () => {
      validatorMock.isPassword.mockReturnValue(false);

      await interactor.execute({
        username: 'username',
        password: '123',
      });

      expect(presenterMock.reply).not.toBeCalled();
      expect(presenterMock.throw).toBeCalledWithInstanceOf(
        UserPasswordInvalidError,
      );
    });
  });
});
