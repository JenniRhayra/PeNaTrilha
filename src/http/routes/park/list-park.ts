import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'

export async function listPark(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/park/list-park',
    {
      schema: {
        tags: ['park'],
        summary: 'Listar parques',
        response: {
          200: z.array(
            z.object({
              id: z.number(),
              park_name: z.string()
            }),
          ),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const parks = await prisma.park.findMany({
          select: {
            id: true,
            park_name: true
          },
          orderBy: {
            park_name: "asc"
          }
        })
        

        return reply.code(200).send(parks)
      } catch (error) {
        console.log(error)
        return reply.code(400).send({ message: 'Ocorreu um erro ao listar os parques' })
      }
    },
  )
}
