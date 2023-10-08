import { hash } from 'bcryptjs'
import { User } from '../../../entities/User'
import { ICreateUserDTO } from '../DTO/ICreateUserDTO'
import IUserRepository from '../repositories/IUserRepository'

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

    console.log('password', passwordHash)

    await this.userRepository.create(user)

    return user
  }
}
