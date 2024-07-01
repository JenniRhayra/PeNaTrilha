import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { BadRequestError } from '../_error/BadRequestError'

export async function inativeUser(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().put(
    '/user/inative-user/:userId',
    {
      schema: {
        tags: ['user'],
        summary: 'Desativar usuário',
        params: z.object({ userId: z.string() }),
        response: {
          200: z.void(),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = parseInt(request.params.userId); 

      const user = await prisma.user.findUnique({where: {id: userId}})

      if(!user) {
        throw new BadRequestError('Usuário não encontrado.')
      }

      user.isActive = false;

      await prisma.user.update({
          data: user,
          where: { id: userId }
      })

      return reply.code(200).send()
    },
  )
}
