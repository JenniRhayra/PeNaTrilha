import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { $Enums } from '@prisma/client';

interface Activity {
    description: string;
    percurso: string;
    duracao: number;
    isMonitored: boolean;
    difficultyLevel: $Enums.DifficultyLevel;
    activityName: string;
    activityImage: string;
}

export async function listManyActivityById(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/park/list-many-activity-by-id/:managerId',
    {
      schema: {
        tags: ['park'],
        summary: 'Listar atividades do parque',
        params: z.object({ managerId: z.string() }),
        response: {
        200:  z.array(
        z.object({
            id: z.number().nullable(),
            description: z.string().nullable(),
            percurso: z.number().nullable(),
            duracao: z.number().nullable(),
            isMonitored: z.boolean().nullable(),
            difficultyLevel: z.enum(['FACIL', 'MEDIO', 'DIFICIL']).nullable(),
            activityName: z.string().nullable(),
            activityImage: z.string().nullable(),
            park: z.object({
              id: z.number().nullable(),
              park_name: z.string().nullable(),
              description: z.string().nullable(),
              site: z.string().nullable(),
              parkImage: z.string().nullable(),
              street: z.string().nullable(),
              number: z.string().nullable(),
              zipCode: z.string().nullable(),
              publicPlace: z.string().nullable(),
              city: z.string().nullable(),
              state: z.string().nullable(),
              neighborhood: z.string().nullable(),
              core: z.string().nullable(),
            })
        })),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
        try {
            const managerId = parseInt(request.params.managerId);

            const manager = await prisma.parkManager.findFirst({where: { userId: managerId }}) 

          if(!manager) {
              return reply.code(404).send({ message: 'Gerente não encontrada' });
          }

            const park = await prisma.park.findFirst({where: { id: manager.parkId }})
            
            if(!park) {
              return reply.code(404).send({ message: 'Parque não encontrada' });
          }

            const activity = await prisma.activity.findMany({
                where: { parkId: park.id },
                include: { park: true }
            })
            
            return reply.code(200).send(activity);
        } catch (error) {
            console.log(error);
            return reply.code(400).send({ message: 'Ocorreu um erro ao buscar a atividade.' });
        }
    },
  )
}
