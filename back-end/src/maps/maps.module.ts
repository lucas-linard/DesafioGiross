import { Module } from '@nestjs/common';
import { MapsController } from './maps.controller';
import { MapsService } from './maps.service';
import { ConfigModule } from '@nestjs/config';
import { NearBySearchesService } from 'src/near-by-searches/near-by-searches.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [MapsController],
  providers: [MapsService,NearBySearchesService]
})
export class MapsModule {}
