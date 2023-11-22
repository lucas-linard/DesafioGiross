import { Injectable } from '@nestjs/common';
import { prismaClient } from 'prisma/prismaCliente';

@Injectable()
export class NearBySearchesService {
  async getNearBySearches(authorId: number) {
    try {
      const data = await prismaClient.nearBySearches.findMany({
        where: {
          author: authorId,
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
