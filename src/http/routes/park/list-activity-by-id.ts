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

export async function listActivityById(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/park/list-activity-by-id/:id',
    {
      schema: {
        tags: ['park'],
        summary: 'Listar atividade do parque',
        params: z.object({ id: z.string() }),
        response: {
        200:  z.object({
            description: z.string(),
            percurso: z.number(),
            duracao: z.number(),
            isMonitored: z.boolean(),
            difficultyLevel: z.enum(['FACIL', 'MEDIO', 'DIFICIL']),
            activityName: z.string(),
            activityImage: z.string(),
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
            
            const activity = await prisma.activity.findFirst({
                where: {id},
                select: { 
                    activityImage: true, 
                    activityName: true, 
                    description: true, 
                    difficultyLevel: true,
                    isMonitored: true, 
                    duracao: true ,
                    percurso: true
                }
            })

            if(!activity) {
                return reply.code(404).send({ message: 'Atividade não encontrada' });
            }
            
            return reply.code(200).send(activity);
        } catch (error) {
            console.log(error);
            return reply.code(400).send({ message: 'Ocorreu um erro ao buscar a atividade.' });
        }
    },
  )
}
