/* eslint-disable no-useless-constructor */
import dayjs from 'dayjs'
import { AuthenticateRepository } from '../module/authenticate/repositories/implementation/AuthenticateRepository'

export class GenerateRefreshToken {
  constructor(private authenticateRepository: AuthenticateRepository) {}
  async execute(userId: string): Promise<string> {
    const expiresIn = dayjs().add(15, 'seconds').unix()

    const generateRefreshToken = await this.authenticateRepository.create(
      userId,
      expiresIn,
    )

    return generateRefreshToken
  }
}
