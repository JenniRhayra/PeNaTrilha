import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { createUserController } from '../module/user/createUser'

export default async function (fastify: FastifyInstance) {
  fastify.post('/', (request: FastifyRequest, reply: FastifyReply) => {
    createUserController.handle(request, reply)
  })

  fastify.get('/get', (request: FastifyRequest, reply: FastifyReply) => {
    return reply.send(['batata', 'banana'])
  })
}
