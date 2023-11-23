import { FastifyReply, FastifyRequest } from 'fastify'
import { DeleteUserUseCase } from './DeleteUserCase'

export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { id } = request.body as {
      id: string
    }

    try {
      const user = await this.deleteUserUseCase.execute({
        id
      })

      return reply.status(201).send({ message: "Usuário excluído com sucesso!" })
    } catch (err) {
      return reply.status(400).send({ message: err.message })
    }
  }
}