import { Test, TestingModule } from '@nestjs/testing';
import { NearBySearchesController } from './near-by-searches.controller';

describe('NearBySearchesController', () => {
  let controller: NearBySearchesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NearBySearchesController],
    }).compile();

    controller = module.get<NearBySearchesController>(NearBySearchesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
