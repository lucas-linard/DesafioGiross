import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';

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
      // TODO tratar de forma melhor o erro
      throw new Error(e);
    }
  }

  async getNearbyZipCodes(
    latitude: string,
    longitude: string,
    radius: string,
  ): Promise<any> {
    const config = {
      maxResultCount: 4,
      locationRestriction: {
        circle: {
          center: {
            latitude,
            longitude,
          },
          radius,
        },
      },
    };

    try {
      const response = await axios.post(
        'https://places.googleapis.com/v1/places:searchNearby',
        config,
        {
          headers: {
            'X-Goog-Api-Key': process.env.MAPS_API_KEY,
            'X-Goog-FieldMask': 'places.addressComponents',
          },
        },
      );
      const zipCodes = response.data.places.map((result) => {
        const addressComponents = result.addressComponents;
        return addressComponents.find((component) =>
          component.types.includes('postal_code'),
        ).longText;
      });

      return zipCodes;
    } catch (error) {
       throw new HttpException(error.response.data, error.response.status);
    }
  }
}
