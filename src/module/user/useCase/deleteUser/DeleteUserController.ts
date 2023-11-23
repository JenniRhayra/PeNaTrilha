/* eslint-disable no-useless-constructor */
import { FastifyReply, FastifyRequest } from 'fastify'
import { DeleteUserUseCase } from './DeleteUserUseCase';

export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
    user_id: string,
  ): Promise<FastifyReply> {

    console.log('user_id', user_id)

    try {
      await this.deleteUserUseCase.execute(user_id)

      return reply.status(201).send()
    } catch (err) {
      return reply.status(400).send({ message: err.message })
    }
  }
}
