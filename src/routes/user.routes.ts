import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { createUserController } from '../module/user/useCase/createUser'
import { listUserController } from '../module/user/useCase/listUser'
import { deleteUserController } from '../module/user/useCase/deleteUser'

export default async function (fastify: FastifyInstance) {
  fastify.post('/createUser', (request: FastifyRequest, reply: FastifyReply) => {
    createUserController.handle(request, reply)
  })

  fastify.get('/', (request: FastifyRequest, reply: FastifyReply) => {
    listUserController.handle(request, reply)
  })

  // fastify.delete(
  //   '/:user_id',
  //   (request: FastifyRequest, reply: FastifyReply) => {
  //     const { user_id } = request.params
  //     deleteUserController.handle(request, reply, user_id)
  //   },
  // )
}
