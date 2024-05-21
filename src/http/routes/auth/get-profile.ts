import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { auth } from '../../middlewares/auth'
import { BadRequestError } from '../_error/BadRequestError'

export async function getProfile(app: FastifyInstance) {
  try {
    app
      .withTypeProvider<ZodTypeProvider>()
      .register(auth)
      .get(
        '/profile',
        {
          schema: {
            tags: ['user'],
            summary: 'Verificar autenticação do usuário',
            response: {
              201: z.object({
                email: z.string().email(),
              }),
              400: z.object({
                message: z.string(),
              }),
            },
          },
        },
        async (request, reply) => {
          console.log('entrei')
          const userId = await request.getCurrentUserId()

          const user = await prisma.user.findUnique({
            select: {
              email: true,
            },
            where: {
              id: userId,
            },
          })

          if (!user) {
            throw new BadRequestError('Usuário não encontrado')
          }

          reply.code(201).send(user)
        },
      )
  } catch (error) {
    console.log(error)
  }
}
