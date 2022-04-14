import { Test, TestingModule } from '@nestjs/testing';
import { ProductlistController } from './productlist.controller';

describe('ProductlistController', () => {
  let controller: ProductlistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductlistController],
    }).compile();

    controller = module.get<ProductlistController>(ProductlistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
