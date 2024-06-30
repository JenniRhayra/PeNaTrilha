import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'

export async function listEventById(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/park/list-event-by-id/:id',
    {
      schema: {
        tags: ['park'],
        summary: 'Listar evento do parque',
        params: z.object({ id: z.string() }),
        response: {
        200:  z.object({
            description: z.string(),
            locationRef: z.string(),
            event_name: z.string(),
            eventImage: z.string(),
            start_date: z.date(),
        }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
        try {
            const id = parseInt(request.params.id);
            
            const event = await prisma.event.findFirst({
                where: {id},
                select: { 
                    description: true,
                    eventImage: true,
                    event_name: true,
                    locationRef: true,
                    start_date: true
                }
            })


            if(!event) {
                return reply.code(404).send({ message: 'Evento não encontrada' });
            }
            
            return reply.code(200).send(event);
        } catch (error) {
            console.log(error);
            return reply.code(400).send({ message: 'Ocorreu um erro ao buscar a evento.' });
        }
    },
  )
}
