import { Test, TestingModule } from '@nestjs/testing';
import { NearBySearchesService } from './near-by-searches.service';

describe('NearBySearchesService', () => {
  let service: NearBySearchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NearBySearchesService],
    }).compile();

    service = module.get<NearBySearchesService>(NearBySearchesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
