import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

export class AuthenticateUserController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { email, password } = JSON.parse(request.body) as {
      email: string
      password: string
    }
    try {

      const token = await this.authenticateUserUseCase.execute({
        email,
        password,
      })

      return reply.status(201).send(token)
    } catch (err) {
      return reply.status(400).send({ message: err.message })
    }
  }
}
