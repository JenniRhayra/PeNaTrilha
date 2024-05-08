import { compare } from 'bcryptjs'
import { UserRepository } from '../../../user/repositories/implementation/UserRepository'
import { GenerateRefreshToken } from '../../../../provider/GenerateRefreshToken'
import { GenerateTokenProvider } from '../../../../provider/GenerateTokenProvider'
import { AuthenticateRepository } from '../../repositories/implementation/AuthenticateRepository'

interface IRequest {
  email: string
  password: string
}

interface IReponse {
  token: string
  refreshToken: string
}

export class AuthenticateUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private useRepository: UserRepository,
    private generateTokenProvider: GenerateTokenProvider,
    private generateRefreshToken: GenerateRefreshToken,
    private authenticateRepository: AuthenticateRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IReponse> {
    const userAlreadyExist = await this.useRepository.findByEmail(email)

    if (!userAlreadyExist) {
      throw new Error('Usuário ou senha incorreta.')
    }

    const passwordMatch = await compare(password, userAlreadyExist.password)

    if (!passwordMatch) {
      throw new Error('Usuário ou senha incorreta.')
    }

    await this.authenticateRepository.deleteMany(userAlreadyExist.id)

    const token = await this.generateTokenProvider.execute(userAlreadyExist.id)

    const refreshToken = await this.generateRefreshToken.execute(
      userAlreadyExist.id,
    )

    return { token, refreshToken }
  }
}
