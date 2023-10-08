/* eslint-disable no-useless-constructor */
import { FastifyReply, FastifyRequest } from 'fastify'
import { RefreshTokenUseCase } from './RefreshTokenUseCase'

export class RefreshTokenController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { refreshToken } = request.body as {
      refreshToken: string
    }

    const token = await this.refreshTokenUseCase.execute(refreshToken)

    return reply.send({ token })
  }
}
