import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { MapsService } from './maps.service';

@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Get('geocode')
  getGeocode(@Request() req): Promise<any> {
    return this.mapsService.getGeocode(req.query.zipCode);
  }

  @Post('searchNearby')
  getNearbyZipCodes(
    @Body() searchNearbyDTO: Record<string, any>,
  ): Promise<any> {
    return this.mapsService.getNearbyZipCodes(
      searchNearbyDTO.latitude,
      searchNearbyDTO.longitude,
      searchNearbyDTO.radius,
    );
  }
}
