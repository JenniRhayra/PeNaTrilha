/* eslint-disable no-useless-constructor */
import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { name, email, password } = request.body as {
      name: string
      email: string
      password: string
    }

    try {
      const user = await this.createUserUseCase.execute({
        name,
        email,
        password,
      })

      return reply.status(201).send({ user })
    } catch (err) {
      return reply.status(400).send({ message: err.message })
    }
  }
}
