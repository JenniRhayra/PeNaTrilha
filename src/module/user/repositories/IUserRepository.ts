import { User } from '@prisma/client'
import { ICreateUserDTO } from '../DTO/ICreateUserDTO'
import { IDeleteUserDTO } from '../DTO/IDeleteUserDTO'

export default interface IUserRepository {
  create(user: ICreateUserDTO): Promise<void>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  delete(user: IDeleteUserDTO): Promise<void>
}
