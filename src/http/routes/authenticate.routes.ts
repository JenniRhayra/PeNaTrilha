import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { authenticateUserController } from '../../module/authenticate/useCases/createToken'
import { ICreateRefreshTokenDTO } from '../../module/authenticate/DTO/ICreateRefreshTokenDTO'

export default async function (fastify: FastifyInstance) {
  // fastify.post<{ Body: ICreateRefreshTokenDTO }>(
  //   '/',
  //   (request: FastifyRequest, reply: FastifyReply) => {
  //     authenticateUserController.handle(request, reply)
  //   },
  // )
}
