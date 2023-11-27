import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { prismaClient } from 'prisma/prismaCliente';

@Injectable()
export class NearBySearchesService {
  constructor(private jwtService: JwtService) {}

  async getNearBySearches(token: string) {
    try {
      const { id: author } = this.jwtService.decode(token) as { id: number };
      const data = await prismaClient.nearBySearches.findMany({
        where: {
          author,
        },
      });
      return {
        data,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async CreateNearBySearches(
    entryZipCode: string,
    radius: number,
    author: number,
  ) {
    try {
      const data = await prismaClient.nearBySearches.create({
        data: {
          entry_zip_code: entryZipCode,
          radius,
          author,
        },
      });

      return {
        created: {
          ...data,
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteNearBySearches(authorId: number) {
    try {
      await prismaClient.nearBySearches.deleteMany({
        where: {
          author: authorId,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
