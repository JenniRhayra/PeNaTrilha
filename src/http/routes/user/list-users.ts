import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { BadRequestError } from '../_error/BadRequestError'

export async function listUsers(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/user/list-users',
    {
      schema: {
        tags: ['user'],
        summary: 'Listar usuários cadastrados',
        response: {
          201: z.array(
            z.object({
              email: z.string().email(),
              group: z.string(),
              isActive: z.boolean(),
            }),
          ),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
     
      const users = await prisma.user.findMany({
        select: {
          email: true,
          group: true,
          isActive: true,
        },
      })

      if (users.length <= 0) {
        throw new BadRequestError('Não existe usuários para listar')
      }

      return reply.code(201).send(users)
    },
  )
}
