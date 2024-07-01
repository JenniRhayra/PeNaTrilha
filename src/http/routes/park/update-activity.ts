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

export async function updateActivity(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().put(
    '/park/update-activity',
    {
      schema: {
        tags: ['park'],
        summary: 'Atualizar atividade',
        body: z.object({
          id: z.number().nullable(),
          activityImage: z.string().nullable(),
          activityName: z.string().nullable(),
          description: z.string().nullable(),
          difficultyLevel: z.enum(['FACIL', 'MEDIO', 'DIFICIL']).nullable(),
          duracao: z.number().nullable(),
          isMonitored: z.boolean().nullable(),
          percurso: z.number().nullable(),
        }),
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
            const activityParams = request.body

            const activity = await prisma.activity.findFirst({
                where: { id: activityParams.id },
            })

            if(!activity) {
              return reply.code(404).send({ message: 'Atividade não encontrada' });
          }

          await prisma.activity.update(
            {
              data: activityParams,
              where: { id: activity.id }
            }
          )
            
        } catch (error) {
            console.log(error);
            return reply.code(400).send({ message: 'Ocorreu um erro ao buscar a atividade.' });
        }
    },
  )
}
