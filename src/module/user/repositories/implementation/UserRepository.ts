import { User } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { ICreateUserDTO } from '../../DTO/ICreateUserDTO'
import IUserRepository from '../IUserRepository'

export class UserRepository implements IUserRepository {
  async create(user: ICreateUserDTO): Promise<void> {
    await prisma.user.create({
      data: user,
    })
  }

  async find(): Promise<User[] | void> {
    const user = prisma.user.findMany()

    return user
  }

  async findById(userId: string): Promise<User | void> {
    const user = prisma.user.findFirst({
      where: {
        id: userId,
      },
    })

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: {
        email,
      },
    })
  }

  async delete(userId: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    })
  }

  async save(user: User): Promise<void> {
    await prisma.user.update({
      where: { id: user.id },
      data: user,
    })
  }
}
