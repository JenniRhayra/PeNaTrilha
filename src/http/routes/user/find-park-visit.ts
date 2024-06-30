import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { BadRequestError } from '../_error/BadRequestError'

export async function findParkVisit(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/user/find-park-visit/:parkId/:email',
    {
      schema: {
        tags: ['user'],
        summary: 'Encontrar parques visitados',
        params: z.object({ parkId: z.string(), email: z.string() }),
        response: {
          201: z.boolean(),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const parkId = parseInt(request.params.parkId); 
      const email = request.params.email; 

      const user = await prisma.user.findUnique({where: {email}})

      if(!user) {
        throw new BadRequestError('Usuário não encontrado.')
      }

      const park = await prisma.park.findFirst({where: {id: parkId}})

      if(!park) {
        throw new BadRequestError('Parque não encontrado.')
      }

      const parkVisit = await prisma.parkVisit.findFirst({where: { parkId: park.id, userId: user.id }})

      return reply.code(201).send(!!parkVisit)
    },
  )
}
