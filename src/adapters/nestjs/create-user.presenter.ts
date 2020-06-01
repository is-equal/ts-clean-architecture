import type { Response } from 'express';
import type { Presenter } from '../../core/common/presenter';
import { CreateUserResponse } from '../../core/user/dto/create-user.response';

export class CreateUserPresenter implements Presenter<CreateUserResponse> {
  constructor(private readonly res: Response) {}

  async reply(data: CreateUserResponse): Promise<void> {
    this.res.status(201).json(data);
  }

  async throw(error: Error): Promise<void> {
    this.res.status(401).json(error);
  }
}
