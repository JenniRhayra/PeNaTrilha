import { User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { ICreateUserDTO } from '../../DTO/ICreateUserDTO'
import { IDeleteUserDTO } from '../../DTO/IDeleteUserDTO'
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

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: {
        id,
      },
    })
  }

  async delete(user: IDeleteUserDTO): Promise<void> {
    await prisma.user.delete({
      where: {
        id : user.id
      },
    })
  }

}
