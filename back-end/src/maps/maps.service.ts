import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class MapsService {

  async getGeocode(zipCode: string): Promise<any> {
    //axiosRespose
    console.log(zipCode);
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${process.env.MAPS_API_KEY}`,
      );

      if (response.data.status !== 'OK')
        return {
          location: [],
          status: response.data.status,
        };

      return {
        location: response.data.results[0].geometry.location,
        status: response.data.status,
      };
    } catch (e) {
      throw new Error(e);
    }
  }
}
