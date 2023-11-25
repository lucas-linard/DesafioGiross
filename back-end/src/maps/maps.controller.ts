import { Body, Controller, Get, UseGuards, Request } from '@nestjs/common';
import { MapsService } from './maps.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  getGeocode(zip: string): Promise<any> {
    return this.mapsService.getGeocode(zip);
  }

  @UseGuards(AuthGuard)
  @Get('searchNearby')
  async getNearbyZipCodes(@Request() req): Promise<any> {
    const { location } = await this.getGeocode(req.query.zip);

    return this.mapsService.getNearbyZipCodes(
      location.lat,
      location.lng,
      req.query.radius,
    );
  }
}
