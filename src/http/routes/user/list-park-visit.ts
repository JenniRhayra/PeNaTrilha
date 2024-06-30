import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { BadRequestError } from '../_error/BadRequestError'

export async function listParkVisit(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/user/list-park-visit/:userId',
    {
      schema: {
        tags: ['user'],
        summary: 'Encontrar parques visitados por usuário',
        params: z.object({ userId: z.string() }),
        response: {
          201: z.array(
            z.object({
                id: z.number(),
                parkId: z.number(),
                userId: z.number(),
                park: z.object({
                    id: z.number(),
                    park_name: z.string(),
                    parkImage: z.string(),
                })
            }) 
          ),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = parseInt(request.params.userId); 

      const user = await prisma.user.findUnique({where: { id: userId }})

      if(!user) {
        throw new BadRequestError('Usuário não encontrado.')
      }


      const parkVisit = await prisma.parkVisit.findMany({where: 
        { userId: user.id }, 
        include: { 
            park: { 
                select: { 
                    id: true, 
                    parkImage: true, 
                    park_name: true 
                } 
            } 
        }})

      return reply.code(201).send(parkVisit)
    },
  )
}
