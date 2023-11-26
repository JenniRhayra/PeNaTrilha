/* eslint-disable no-useless-constructor */
import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { email, password, group } = JSON.parse(request.body) as {
      email: string
      group: string
      password: string
    }

    console.log(JSON.parse(request.body))

    try {
      const user = await this.createUserUseCase.execute({
        email,
        group,
        password,
      })

      return reply.status(201).send({ user })
    } catch (err) {
      return reply.status(400).send({ message: err.message })
    }
  }
}
