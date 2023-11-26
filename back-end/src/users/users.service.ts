import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { prismaClient } from 'prisma/prismaCliente';
import { userDTO } from 'src/DTOs/user.DTO';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  async findOne(email: string): Promise<Users | null> {
    const user = await prismaClient.users.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async create(userInput: userDTO): Promise<object | null> {
    console.log(userInput);
    try {
      const existingUser = await this.findOne(userInput.email);

      if (existingUser) {
        return { msg: 'Já existe um usuário com este e-mail.' };
      }

      const hashedPassword = await hash(userInput.password, 8);
      await prismaClient.users.create({
        data: {
          name: userInput.name,
          email: userInput.email,
          password: hashedPassword,
        },
      });

      return { msg: 'OK' };
    } catch (error) {
      throw new BadRequestException(`Erro ao criar usuário: ${error.message}`);
    }
  }
}
