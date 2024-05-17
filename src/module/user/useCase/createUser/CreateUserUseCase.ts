import { hash } from 'bcryptjs'
import { ICreateUserDTO } from '../../DTO/ICreateUserDTO'
import IUserRepository from '../../repositories/IUserRepository'
import { User } from '../../../../entities/User'

export class CreateUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    const userAlreadyExist = await this.userRepository.findByEmail(data.email)

    if (userAlreadyExist) {
      throw new Error('Usuário já cadastrado.')
    }

    const user = new User(data)
    const passwordHash = await hash(data.password, 8)
    user.password = String(passwordHash)

    await this.userRepository.create(user)

    return user
  }
}
