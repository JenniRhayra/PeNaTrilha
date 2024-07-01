import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import path from 'path'
import fs from 'fs';
import axios from 'axios'
import FormData from 'form-data'
import fastifyMultipart from '@fastify/multipart'
import { prisma } from '../../../lib/prisma';
import { BadRequestError } from '../_error/BadRequestError';
import console from 'console';
import nodemailer, { Transporter } from 'nodemailer';
import { resolve } from 'path';
import handlebars from 'handlebars';

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
          201: z.object({
            token: z.string(),
            id: z.number(),
            email: z.string(),
            group: z.enum(['ADMINISTRADOR', 'VISITANTE', 'GERENTE', 'GUIA']),
          }),
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
      let imagePath;
      let imageUrl = undefined;

      for await (const part of parts) {
        // console.log('part',part)
        if (part.file) {
          imageFile = part;
          // const uploadDir = path.join(__dirname, '../../../../uploads');
          // await fs.mkdir(uploadDir, { recursive: true });
          // imagePath = path.join(uploadDir, imageFile.filename);
          // await fs.writeFile(imagePath, await imageFile.toBuffer());
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

      const user = await prisma.user.findFirst({
        where: {
          email: fields?.email
        }
      })

      if (!user.isActive) {
        throw new BadRequestError('Usuário desativado.');
      }

      if (user.group != 'GUIA') {
        throw new BadRequestError('Usuário não pertence ao grupo de Guia.');
      }

      user.phone = fields?.phone.replace(/\D/g, "");

      await prisma.user.update({data: user, where: { id: user.id }})

      const parkData = await prisma.park.findFirst({
        where: {
          id: park[0]?.value
        }
      })

      if(!parkData){
        throw new BadRequestError('Parque não encontrado.')
      }

      console.log(parkData)

      const { id } = await prisma.guide.create({
        data: {
          biography: fields?.description,
          nickname: fields?.slugname,
          birthDate: data,
          guideImage: imageUrl,
          userId: user.id,
          approvalStatus: 'PENDENTE',
          gender: fields?.gender,
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
     
     await prisma.user.update({
      where: { id: user.id },
      data: {
        name: fields.name
      }
    });


    try {
      const transporter = nodemailer.createTransport({
        host: 'smtppro.zoho.com',
        port: 465,
        auth: {
          user: 'portalcoleta@techcenter.net.br',
          pass: 'eO@lon9e'
        },
        tls: {
          rejectUnauthorized: true
        }
      })

      const variable = {
        managerName: user.name,
        currentYear: String(new Date().getFullYear())
      }

      const templatePath = resolve(__dirname, '..', '..', '..', 'views', 'guideAprovation', 'index.hbs')

      const tamplateFileContent = await fs.readFileSync(templatePath).toString('utf-8');

      const templateParse = handlebars.compile(tamplateFileContent);

      const templateHTML = templateParse(variable)

      const message = await transporter.sendMail({
        to: user.email,
        from: 'portalcoleta@techcenter.net.br',
        subject: 'Pé na Trilha - Validação de gerente',
        html: templateHTML,
        cc: 'gusthavorangel@gmail.com'
        // attachments //Arquivos se precisar
      })

      console.log('Message sent: %s', message.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    } catch (error) {
      console.log('error', error)
    }

    const token = await reply.jwtSign(
      {
        sub: user.id,
      },
      {
        expiresIn: '1d',
      },
    )

      return reply.code(201).send({ token, id: user.id, email: user.email, group: user.group })
     } catch (error) {
      console.log(error)
     }
    },
  )
}
