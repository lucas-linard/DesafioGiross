import { Body, Controller, Get, UseGuards, Request, HttpException } from '@nestjs/common';
import { MapsService } from './maps.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { NearBySearchesService } from 'src/near-by-searches/near-by-searches.service';
import { JwtService } from '@nestjs/jwt';

@Controller('maps')
export class MapsController {
  constructor(
    private readonly mapsService: MapsService,
    private readonly nearBySearchesService: NearBySearchesService,
    private jwtService: JwtService,
  ) {}

  getGeocode(zip: string): Promise<any> {
    return this.mapsService.getGeocode(zip);
  }

  @UseGuards(AuthGuard)
  @Get('searchNearby')
  async getNearbyZipCodes(@Request() req): Promise<any> {
    try {
      const jwt = this.jwtService.decode(
        req.headers.authorization.split(' ')[1],
      );

      const { location } = await this.getGeocode(req.query.zip);
        
      
      const result = await this.mapsService.getNearbyZipCodes(
        location.lat,
        location.lng,
        req.query.radius,
      );

      await this.nearBySearchesService.CreateNearBySearches(
        req.query.zip,
        parseInt(req.query.radius),
        jwt.sub,
      );

      return result;
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
