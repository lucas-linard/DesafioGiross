import { Module } from '@nestjs/common';
import { NearBySearchesController } from './near-by-searches.controller';
import { NearBySearchesService } from './near-by-searches.service';

@Module({
  controllers: [NearBySearchesController],
  providers: [NearBySearchesService]
})
export class NearBySearchesModule {}
