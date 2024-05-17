import { GenerateTokenProvider } from '../../../../provider/GenerateTokenProvider'
import { AuthenticateRepository } from '../../repositories/implementation/AuthenticateRepository'
import { RefreshTokenController } from './RefreshTokenController'
import { RefreshTokenUseCase } from './RefreshTokenUseCase'

const authenticateRepository = new AuthenticateRepository()
const generateTokenProvider = new GenerateTokenProvider()
const refreshTokenUseCase = new RefreshTokenUseCase(
  authenticateRepository,
  generateTokenProvider,
)
const refreshTokenController = new RefreshTokenController(refreshTokenUseCase)

export { refreshTokenController }
