import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MapsModule } from './maps/maps.module';
import { AuthModule } from './auth/auth.module';
import { NearBySearchesModule } from './near-by-searches/near-by-searches.module';

@Module({
  imports: [MapsModule,AuthModule, NearBySearchesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
