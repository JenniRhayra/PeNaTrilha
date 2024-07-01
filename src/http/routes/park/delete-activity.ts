import fastify, { FastifyInstance } from 'fastify'
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

export async function deleteActivity(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().delete(
    '/park/delete-activity/:id',
    {
      schema: {
        tags: ['park'],
        summary: 'Deletar atividade',
        params: z.object({ id: z.string() }),
        response: {
        200:  z.void(),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
        try {
            const activityId = parseInt(request.params.id);

            const activity = await prisma.activity.findFirst({
                where: { id: activityId },
            })

            if(!activity) {
              return reply.code(404).send({ message: 'Atividade não encontrada' });
          }

          await prisma.activity.delete({ where: { id: activity.id  } })
            
        } catch (error) {
            console.log(error);
            return reply.code(400).send({ message: 'Ocorreu um erro ao buscar a atividade.' });
        }
    },
  )
}
