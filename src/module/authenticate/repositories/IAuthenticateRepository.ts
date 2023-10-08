import { RefreshToken } from '@prisma/client'

export interface IAuthenticateRepository {
  create(userId: string, expiresIn: number): Promise<string>
  deleteMany(userId: string): Promise<void>
  findById(refreshId: string): Promise<RefreshToken>
}
