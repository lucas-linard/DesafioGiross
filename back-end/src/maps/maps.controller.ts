import { Body, Controller, Get, UseGuards, Request } from '@nestjs/common';
import { MapsService } from './maps.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { NearBySearchesService } from 'src/near-by-searches/near-by-searches.service';

@Controller('maps')
export class MapsController {
  constructor(
    private readonly mapsService: MapsService,
    private readonly nearBySearchesService: NearBySearchesService,
  ) {}

  getGeocode(zip: string): Promise<any> {
    return this.mapsService.getGeocode(zip);
  }

  @UseGuards(AuthGuard)
  @Get('searchNearby')
  async getNearbyZipCodes(@Request() req): Promise<any> {
    try {
      const { location } = await this.getGeocode(req.query.zip);

      const result = await this.mapsService.getNearbyZipCodes(
        location.lat,
        location.lng,
        req.query.radius,
      );

      await this.nearBySearchesService.CreateNearBySearches(
        req.query.zip,
        parseInt(req.query.radius),
        1,
      );

      return result;
    } catch (error) {
      throw new Error('Ocorreu um erro durante a busca próxima.');
    }
  }
}
