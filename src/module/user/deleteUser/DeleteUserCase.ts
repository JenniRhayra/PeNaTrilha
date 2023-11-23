import { hash } from 'bcryptjs'
import { User } from '../../../entities/User'
import { ICreateUserDTO } from '../DTO/ICreateUserDTO'
import IUserRepository from '../repositories/IUserRepository'
import { IDeleteUserDTO } from '../DTO/IDeleteUserDTO'

export class DeleteUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IDeleteUserDTO): Promise<void> {
    const userAlreadyExist = await this.userRepository.findById(data.id)
    if (userAlreadyExist === null) {
      throw new Error('Usuário não existe!')
    }

    await this.userRepository.delete(userAlreadyExist)  
  }
}