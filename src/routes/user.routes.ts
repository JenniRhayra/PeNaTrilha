import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { createUserController } from '../module/user/createUser'
//import { deleteUserController } from '../module/user/deleteUser'

export default async function (fastify: FastifyInstance) {
  fastify.post('/createUser', (request: FastifyRequest, reply: FastifyReply) => {
    createUserController.handle(request, reply)
  })

  fastify.get('/', (request: FastifyRequest, reply: FastifyReply) => {
    return reply.send(['batata', 'banana'])
  })
}
