import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'


export async function listForestType(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/park/list-forest-type',
    {
      schema: {
        tags: ['park'],
        summary: 'Listar tipo de matas cadastradas',
        response: {
          201: z.array(
            z.object({
              id: z.number(),
              name: z.string()
            }),
          ),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
     
      const forestTypes = await prisma.forestType.findMany({
        select: {
          id: true,
          name: true,
        },
      })

      return reply.code(201).send(forestTypes)
    },
  )
}
