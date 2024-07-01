import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'

const zPark =  z.object({
  id: z.number().nullable(),
  park_name: z.string().nullable(),
  description: z.string().nullable(),
  parkImage: z.string().nullable(),
})

const zParkVisit = z.array(
  z.object({
    id: z.number().nullable(),
    parkId: z.number().nullable(),
    userId: z.number().nullable(),
    park: zPark
  })
)

const zUser =  z.object({
  id: z.number().nullable(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  parkVisit: zParkVisit
})


export async function getUserProfile(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/user/get-user-profile/:userId',
    {
      schema: {
        tags: ['user'],
        summary: 'Obter perfil do visitante',
        params: z.object({ userId: z.string() }),
        response: {
          200: zUser,
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const userId = parseInt(request.params.userId)

        const user = await prisma.user.findFirst({where: {id: userId, isActive: true}, include: { parkVisit: { include: { park: true } } }})

        if(!user) {
          return reply.code(404).send({ message: 'Usuário não encontrada' });
        }



        return reply.code(200).send(user)
      } catch (error) {
        console.log(error)
        return reply.code(400).send({ message: 'Ocorreu um erro ao buscar o guia' });
      }

    },
  )
}
