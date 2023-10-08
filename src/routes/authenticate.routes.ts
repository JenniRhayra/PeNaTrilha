import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { authenticateUserController } from '../module/authenticate/createToken'

export default async function (fastify: FastifyInstance) {
  fastify.post('/', (request: FastifyRequest, reply: FastifyReply) => {
    authenticateUserController.handle(request, reply)
  })
}
