/* eslint-disable no-useless-constructor */
import dayjs from 'dayjs'
import { GenerateTokenProvider } from '../../../../provider/GenerateTokenProvider'
import { AuthenticateRepository } from '../../repositories/implementation/AuthenticateRepository'

interface IReponse {
  token: string
  refresh_token: string
}

export class RefreshTokenUseCase {
  constructor(
    private authenticateRepository: AuthenticateRepository,
    private generateTokenProvider: GenerateTokenProvider,
  ) {}

  async execute(refreshToken: string): Promise<string | IReponse> {
    const tokenExist = await this.authenticateRepository.findById(refreshToken)

    if (!tokenExist) {
      throw new Error('Refresh token inválido')
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(tokenExist.expiresIn),
    )

    const token = await this.generateTokenProvider.execute(tokenExist.userId)

    if (refreshTokenExpired) {
      await this.authenticateRepository.deleteMany(tokenExist.userId)

      const newRefreshToken = await this.generateTokenProvider.execute(
        tokenExist.userId,
      )

      return { token, refresh_token: newRefreshToken }
    }

    return token
  }
}
