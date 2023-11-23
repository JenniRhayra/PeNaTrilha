import IUserRepository from "../../repositories/IUserRepository"
import { User } from "../../../../entities/User"

export class ListUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<User[] | void> {
    const users = await this.userRepository.find();

    return users
  }
}
