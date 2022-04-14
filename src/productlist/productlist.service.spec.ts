import { Test, TestingModule } from '@nestjs/testing';
import { ProductlistService } from './productlist.service';

describe('ProductlistService', () => {
  let service: ProductlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductlistService],
    }).compile();

    service = module.get<ProductlistService>(ProductlistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
