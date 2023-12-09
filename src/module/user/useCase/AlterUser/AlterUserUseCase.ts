import { hash } from 'bcryptjs'
import IUserRepository from '../../repositories/IUserRepository'

interface IRequest {
  id: string
  email: string
  group: string
  password: string
}

export class AlterUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private userRepository: IUserRepository) {}

  async execute({ id, email, group, password }: IRequest): Promise<void> {
    const userAlreadyExist = await this.userRepository.findById(id)
    if (!userAlreadyExist) {
      throw new Error('Usuário não encontrado')
    }

    const passwordHash = await hash(password, 8)
    userAlreadyExist.password = String(passwordHash)
    userAlreadyExist.email = email
    userAlreadyExist.group = group

    await this.userRepository.save(userAlreadyExist)
  }
}
