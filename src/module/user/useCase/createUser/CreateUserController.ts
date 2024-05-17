/* eslint-disable no-useless-constructor */
import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { email, password, groupId } = request.body

    try {
      const user = await this.createUserUseCase.execute({
        email,
        groupId,
        password,
      })

      return reply.status(201).send({ user })
    } catch (err) {
      return reply.status(400).send({ message: err.message })
    }
  }
}
