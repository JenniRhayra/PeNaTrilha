/* eslint-disable no-useless-constructor */
import { FastifyReply, FastifyRequest } from 'fastify'
import { ListUserUseCase } from './ListUserUseCase'

export class ListUserController {
  constructor(private listUserUseCase: ListUserUseCase) {}

  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const user = await this.listUserUseCase.execute()

      return reply.status(201).send({ user })
    } catch (err) {
      return reply.status(400).send({ message: err.message })
    }
  }
}
