import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'


export async function listLanguages(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/guide/list-languages',
    {
      schema: {
        tags: ['guide'],
        summary: 'Listar linguagens cadastradas',
        response: {
          201: z.array(
            z.object({
              id: z.number(),
              languageName: z.string()
            }),
          ),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
     
      const languages = await prisma.language.findMany({
        select: {
          id: true,
          languageName: true,
        },
      })

      return reply.code(201).send(languages)
    },
  )
}
