/* eslint-disable prettier/prettier */
import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    
    userController = module.get<UserController>(UserController);
  });

describe('null', () => {
  it('should matches null', async() => {    
    expect(userController).toBeDefined();
  });
});
});