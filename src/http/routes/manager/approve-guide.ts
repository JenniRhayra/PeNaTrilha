import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma';
import { BadRequestError } from '../_error/BadRequestError';
import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import { resolve } from 'path';
import handlebars from 'handlebars';
import error from 'next/error';

const createManagerSchema = z.object({
  id: z.number(),
  status: z.enum(['PENDENTE', 'APROVADO', 'REPROVADO']),
  managerId: z.number(),
});

type CreateManagertBody = z.infer<typeof createManagerSchema>;

const errorResponseSchema = z.object({
  message: z.string(),
  error: z.object({}).optional(),
});

export async function approveGuide(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/manager/approve-guide',
    {
      schema: {
        tags: ['manager'],
        summary: 'Adicionar informações do gerente do parque',
        body: createManagerSchema,
        response: {
          201: z.void(),
          400: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
        const { id, status, managerId } = request.body as CreateManagertBody;
        console.log('cheguei', id)
        const guide = await prisma.guide.findFirst(
            { where: { id: Number(id) }}
        )

        if(!guide){
            throw new BadRequestError('Guia não encontrado.');
        }

        const user = await prisma.user.findFirst(
            { where: { id: Number(guide.userId) }}
        )

        if(!user){
            throw new BadRequestError('Usuário não encontrado.');
        }

        const park  = await prisma.parkGuide.findFirst(
            { where: { guideId: Number(guide.id) }, include: { park: true }}
        )


        if(!park){
            throw new BadRequestError('Parque não encontrado.');
        }

        guide.approvalStatus = status
        guide.parkManagerId = managerId
        
        await prisma.guide.update(
            {
                data: guide,
                where: { id: Number(id) }
            }
        )

        try {
        const transporter = nodemailer.createTransport({
          host: 'smtppro.zoho.com',
          port: 465,
          auth: {
            user: 'portalcoleta@techcenter.net.br',
            pass: 'eO@lon9e'
          },
          tls: {
            rejectUnauthorized: false
          }
        })
  
        const variable = {
          guideName: user.name,
          park: park.park.park_name,
          status,
          currentYear: String(new Date().getFullYear())
        }
  
        const templatePath = resolve(__dirname, '..', '..', '..', 'views', 'managerAproved', 'index.hbs')
  
        const tamplateFileContent = fs.readFileSync(templatePath).toString('utf-8');
  
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
        return reply.code(201).send()
    },
  )
}


