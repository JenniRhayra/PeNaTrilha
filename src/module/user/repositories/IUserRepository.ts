import { User } from '@prisma/client'
import { ICreateUserDTO } from '../DTO/ICreateUserDTO'

export default interface IUserRepository {
  create(user: ICreateUserDTO): Promise<void>
  findByEmail(email: string): Promise<User | null>
}
