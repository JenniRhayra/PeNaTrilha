/* eslint-disable no-useless-constructor */
import { FastifyReply, FastifyRequest } from 'fastify'
import { AlterUserUseCase } from './AlterUserUseCase'

export class AlterUserController {
  constructor(private alterUserUseCase: AlterUserUseCase) {}

  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { id, email, password, group } = JSON.parse(request.body) as {
      id: string
      email: string
      group: string
      password: string
    }

    // console.log(JSON.parse(request.body))

    try {
      const user = await this.alterUserUseCase.execute({
        id,
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
