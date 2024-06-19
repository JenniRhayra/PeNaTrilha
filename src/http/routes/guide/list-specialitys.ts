import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'


export async function listSpeciality(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/guide/list-specialitys',
    {
      schema: {
        tags: ['guide'],
        summary: 'Listar linguagens especialidades',
        response: {
          201: z.array(
            z.object({
              id: z.number(),
              specialtyName: z.string()
            }),
          ),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
     
      const languages = await prisma.specialty.findMany({
        select: {
          id: true,
          specialtyName: true,
        },
      })

      return reply.code(201).send(languages)
    },
  )
}
