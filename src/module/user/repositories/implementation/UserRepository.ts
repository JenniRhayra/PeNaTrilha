import { User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { ICreateUserDTO } from '../../DTO/ICreateUserDTO'
import IUserRepository from '../IUserRepository'

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: {
        email,
      },
    })
  }

  async create(user: ICreateUserDTO): Promise<void> {
    await prisma.user.create({
      data: user,
    })
  }
}
