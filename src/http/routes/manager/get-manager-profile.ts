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
  }[],
  park: {
    id: number;
    description: string;
    parkImage: string;
    park_name: string;
  }[]
}

export async function getGuideProfile(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/guide/get-manager-profile/:userId',
    {
      schema: {
        tags: ['manager'],
        summary: 'Obter perfil do gerente',
        params: z.object({ userId: z.string() }),
        response: {
          200: z.object({
            biography: z.string(),
            guideImage: z.string(),
            gender: z.enum(["FEMININO", "MASCULINO", "NAO_RESPONDER"]),
            nickname:z.string(),
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
            ),
            parkGuide: z.array(
              z.object({
              park: z.object({
                  id: z.number(),
                  description: z.string(),
                  parkImage: z.string(),
                  park_name: z.string(),
                })
            }))
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const userId = parseInt(request.params.userId)

        const guide = await prisma.guide.findFirst({
          where: { userId: userId },
          select: {
            biography: true,
            guideImage: true,
            gender: true,
            user: true,
            nickname: true,
            specialtyGuide: { include: { specialty: true } },
            languageGuide: { include: { language: true } },
            parkGuide: {include: { park: true }}
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
