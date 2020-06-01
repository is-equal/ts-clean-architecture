
import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import type { Response } from 'express';
import { UserDataSource } from '../../data-sources/database/user.datasource';
import { User } from '../../core/user/user';
import { CreateUserInteractor } from '../../core/user/interactor/create-user.interactor';
import { CustomValidator } from '../../adapters/validator';
import { CreateUserRequest } from '../../core/user/dto/create-user.request';
import { CreateUserPresenter } from '../../adapters/nestjs/create-user.presenter';

@Controller('user')
export class UserController {
  private readonly userRepository: UserDataSource;
  private readonly validator: CustomValidator;

  constructor() {
    this.userRepository = new UserDataSource();
    this.validator = new CustomValidator();
  }

  @Get()
  list(): Promise<User[]> {
    return this.userRepository.find();
  }

  @Post()
  async create(@Res() res: Response, @Body() body: CreateUserRequest): Promise<void> {
    const presenter = new CreateUserPresenter(res);
    const interactor = new CreateUserInteractor(this.userRepository, presenter, this.validator);

    await interactor.execute(body);
  }
}
