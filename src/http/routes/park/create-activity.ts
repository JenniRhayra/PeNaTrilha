import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import axios from 'axios'
import FormData from 'form-data'
import fastifyMultipart from '@fastify/multipart'
import console from 'console';
import { prisma } from '../../../lib/prisma'

export interface Activity {
  percurso: number;
  duracao: number;
  description: string;
  difficultyLevel: 'FACIL' | 'MEDIO' | 'DIFICIL';
  activityName: string;
  activityImage: string;
  parkId: number;
  isMonitored: boolean;
}
export async function createActivity(app: FastifyInstance) {
  app.register(fastifyMultipart);
  app.withTypeProvider<ZodTypeProvider>().post(
    '/park/create-activity',
    {
      schema: {
        tags: ['park'],
        summary: 'Criar atividade',
        body: z.any(),
        response: {
          201: z.void(),
          400: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
            error: z.object({}),
          }),
        },
      },
    },
    async (request, reply) => {
     try {
      const parts = request.parts();
        
      const fields: any = {};
      let imageFile: any; 
      let imageUrl = undefined;

      for await (const part of parts) {
        // console.log('part',part)
        if (part.file) {
          imageFile = part;
          const buffer = await imageFile.toBuffer();
          const formData = new FormData();
          formData.append('image', buffer.toString('base64'));

          const imgbbApiKey = process.env.IMGBB_KEY;
          const imgbbResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formData, {
            headers: {
              ...formData.getHeaders(),
            }
          });

          imageUrl = imgbbResponse.data.data.url;
          console.log('URL da imagem:', imageUrl);
        }
        else {
          fields[part.fieldname] = part.value;
        }
      }

      const manager = await prisma.parkManager.findFirst({
        where: { userId:  Number(fields?.managerId)}
      })

      const createActivity: Activity = {
        percurso: Number(fields?.percurso ?? 0),
        activityImage: String(imageUrl ?? ''),
        activityName: String(fields?.activityName ?? ''),
        description: String(fields?.description ?? ''),
        difficultyLevel: String(fields?.difficultyLevel ?? ''),
        duracao: Number(fields?.duracao ?? 0),
        isMonitored: fields?.duracao == 'true',
        parkId: manager.parkId
      }

      await prisma.activity.create({
        data: createActivity
      })

     } catch (error) {
      console.log(error)
     }
    },
  )
}
