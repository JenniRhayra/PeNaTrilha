import { hash } from 'bcryptjs'
import { User } from '../../../../entities/User'
import { ICreateUserDTO } from '../../DTO/ICreateUserDTO'
import IUserRepository from '../../repositories/IUserRepository'

export class DeleteUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private userRepository: IUserRepository) {}

  async execute(user_id: string): Promise<void> {
    const userAlreadyExist = await this.userRepository.findById(user_id)

    if (!userAlreadyExist) {
      throw new Error('Usuário não encontrado')
    }


    await this.userRepository.delete(user_id)

  }
}
