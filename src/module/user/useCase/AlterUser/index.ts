import { UserRepository } from '../../repositories/implementation/UserRepository'
import { AlterUserController } from './AlterUserController'
import { AlterUserUseCase } from './AlterUserUseCase'

const userRepository = new UserRepository()
const alterUserUseCase = new AlterUserUseCase(userRepository)
const alterUserController = new AlterUserController(alterUserUseCase)

export { alterUserUseCase, alterUserController }
