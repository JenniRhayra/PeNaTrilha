import { GenerateRefreshToken } from '../../../../provider/GenerateRefreshToken'
import { GenerateTokenProvider } from '../../../../provider/GenerateTokenProvider'
import { UserRepository } from '../../../user/repositories/implementation/UserRepository'
import { AuthenticateRepository } from '../../repositories/implementation/AuthenticateRepository'
import { AuthenticateUserController } from './AuthenticateUserController'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

const userRepository = new UserRepository()
const authenticateRepository = new AuthenticateRepository()
const generateRefreshToken = new GenerateRefreshToken(authenticateRepository)
const generateTokenProvider = new GenerateTokenProvider()
const authenticateUserUseCase = new AuthenticateUserUseCase(
  userRepository,
  generateTokenProvider,
  generateRefreshToken,
  authenticateRepository,
)
const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase,
)

export { authenticateUserUseCase, authenticateUserController }
