import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import path from 'path'
import { promises as fs } from 'fs';
import axios from 'axios'
import FormData from 'form-data'
import fastifyMultipart from '@fastify/multipart'
import { prisma } from '../../../lib/prisma';
import { BadRequestError } from '../_error/BadRequestError';

export async function createGuideAccount(app: FastifyInstance) {
  app.register(fastifyMultipart);
  app.withTypeProvider<ZodTypeProvider>().post(
    '/guide/create-account',
    {
      schema: {
        tags: ['guide'],
        summary: 'Criar conta do guia',
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
      const parts = request.parts();
        
      const fields: any = {};
      let imageFile: any;
      let imagePath;
      let imageUrl = undefined;

      for await (const part of parts) {
        // console.log('part',part)
        if (part.file) {
          imageFile = part;
          const uploadDir = path.join(__dirname, '../../../../uploads');
          await fs.mkdir(uploadDir, { recursive: true });
          imagePath = path.join(uploadDir, imageFile.filename);
          await fs.writeFile(imagePath, await imageFile.toBuffer());
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
          // break;
        }
        else {
          fields[part.fieldname] = part.value;
        }
      }

      console.log('fields', fields)

      const [dia, mes, ano] = fields?.date?.split("/").map(Number);

      const data = new Date(ano, mes - 1, dia);

      const park = JSON.parse(fields?.select_park)

      // console.log(park)

      // console.log(data)

      const parkData = await prisma.park.findFirst({
        where: {
          id: park[0]?.value
        }
      })

      if(!parkData){
        throw new BadRequestError('Parque não encontrado.')
      }

      const { id } = await prisma.guide.create({
        data: {
          biography: fields?.description,
          nickname: fields?.slugname,
          birthDate: data,
          guideImage: imageUrl,
          userId: 1,
          parkManagerId: parkData.id,
          approvalStatus: 'PENDENTE',
          gender: fields?.gender
        }
      })

      const languages = JSON.parse(fields?.select_language)

      for await (const language of languages) {
        const languageAlreadyExist = await prisma.language.findFirst({
          where: {
            id: language.value
          }
        })

        if(!languageAlreadyExist){
          throw new BadRequestError('Linguagem não encontrada.')
        }

        await prisma.languageGuide.create({
          data: {
            languageId: languageAlreadyExist.id,
            guideId: id
          }
        })
      }

      const specialitys = JSON.parse(fields?.espec)

      for await (const speciality of specialitys) {
        const specialityAlreadyExist = await prisma.language.findFirst({
          where: {
            id: speciality.value
          }
        })

        if(!specialityAlreadyExist){
          throw new BadRequestError('Especialidade não encontrada.')
        }

        await prisma.specialtyGuide.create({
          data: {
            specialtyId: specialityAlreadyExist.id,
            guideId: id
          }
        })
      }

     await prisma.parkGuide.create({
      data: {
        guideId: id,
        parkId: parkData.id
      }
     })

      return reply.code(201).send()
    },
  )
}
function mapGroupsZodToPrisma(group: any) {
  throw new Error('Function not implemented.')
}

