import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { NearBySearchesService } from './near-by-searches.service';

@Controller('near-by-searches')
export class NearBySearchesController {
  constructor(private readonly NearBySearches: NearBySearchesService) {}

  @Get('')
  getNearBySearches(@Request() req): Promise<any> {
    return this.NearBySearches.getNearBySearches(
      req.headers.authorization.split(' ')[1],
    );
  }

  @Post('')
  create(@Body() searchNearbyDTO: Record<string, any>): Promise<any> {
    return this.NearBySearches.CreateNearBySearches(
      searchNearbyDTO.zipCode,
      searchNearbyDTO.radius,
      searchNearbyDTO.author,
    );
  }

  @Delete('/:author')
  delete(@Param('author') author: string): undefined {
    this.NearBySearches.deleteNearBySearches(parseInt(author));
  }
}
