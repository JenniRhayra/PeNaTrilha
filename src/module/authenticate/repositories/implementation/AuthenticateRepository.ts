/* eslint-disable camelcase */
import { RefreshToken } from '@prisma/client'
import { prisma } from '../../../../lib/prisma'
import { IAuthenticateRepository } from '../IAuthenticateRepository'

export class AuthenticateRepository implements IAuthenticateRepository {
  async create(userId: string, expiresIn: number): Promise<string> {
    const refreshToken = await prisma.refreshToken.create({
      data: {
        expiresIn,
        user: { connect: { id: userId } },
      },
    })

    return refreshToken.id
  }

  async deleteMany(userId: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: {
        userId,
      },
    })
  }

  async findById(refreshId: string): Promise<RefreshToken> {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        id: refreshId,
      },
    })

    return refreshToken
  }
}
