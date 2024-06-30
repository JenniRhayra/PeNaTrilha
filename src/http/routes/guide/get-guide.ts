import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'

interface IResponse {
  biography: string;
  guideImage: string;
  user: {
    name: string;
    email: string;
    phone: string;
  },
  specialtyGuide: {
    specialty: {
      specialtyName: string;
    }
  }[],
  languageGuide: {
    language: {
      languageName: string
    }
  }[]
}

export async function getGuide(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/guide/get-guide/:parkId/:guideId',
    {
      schema: {
        tags: ['guide'],
        summary: 'Obter guia pelo id do parque e pelo id do guia.',
        params: z.object({ parkId: z.string(), guideId: z.string() }),
        response: {
          200: z.object({
            biography: z.string(),
            guideImage: z.string(),
            user: z.object({
              name: z.string(),
              email: z.string(),
              phone: z.string().nullable()
            }),
            specialtyGuide: z.array(
              z.object({
                specialty: z.object({
                  specialtyName: z.string()
                })
              })
            ),
            languageGuide: z.array(
              z.object({
                language: z.object({
                  languageName: z.string()
                })
              })
            )
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const parkId = parseInt(request.params.parkId)
        const guideId = parseInt(request.params.guideId)

        const park = await prisma.park.findFirst({
          where: { id: parkId }
        })

        if (!park) {
          return reply.code(400).send({ message: 'Parque não encontrado' });
        }

        const guide = await prisma.guide.findFirst({
          where: { id: guideId },
          select: {
            biography: true,
            guideImage: true,
            user: true,
            specialtyGuide: { include: { specialty: true } },
            languageGuide: { include: { language: true } }
          }
        })

        if (!guide) {
          return reply.code(400).send({ message: 'Guia não encontrado' });
        }

        console.log('guide', guide)

        return reply.code(200).send(guide)
      } catch (error) {
        console.log(error)
        return reply.code(400).send({ message: 'Ocorreu um erro ao buscar o guia' });
      }

    },
  )
}
