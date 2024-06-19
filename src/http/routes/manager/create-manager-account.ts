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
  email: z.string().email(),
  cgc: z.string(),
  rg: z.string(),
  select_park: z.array(
    z.object(
      {
        value: z.number(),
        label: z.string()
      }
    )
  ),
});

type CreateManagertBody = z.infer<typeof createManagerSchema>;

const errorResponseSchema = z.object({
  message: z.string(),
  error: z.object({}).optional(),
});

export async function createManagerAccount(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/manager/create-account',
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
        const { cgc, rg, email, select_park } = request.body as CreateManagertBody;

        if (cgc.length !== 11) {
          throw new BadRequestError('CPF deve conter 11 dígitos');
        }
  
        const rgLength = rg.length;
        if (rgLength !== 9) {
          throw new BadRequestError('RG deve conter 9 dígitos');
        }
  
        const user = await prisma.user.findFirst({
          where: {
            email
          }
        })
  
        if (!user.isActive) {
          throw new BadRequestError('Usuário desativado.');
        }
  
        if (user.group != 'GERENTE') {
          throw new BadRequestError('Usuário não pertence ao grupo de Gerentes.');
        }
  
        const { label, value } = select_park[0];
  
        const park = (await prisma.park.findFirst({where: {id: value}})) || (await prisma.park.create({data: {park_name: label}}))
  
        const manager = await prisma.parkManager.create({
          data: {
            cpf: cgc,
            rg,
            parkId: park.id,
            userId: user.id,
            approvalStatus: 'PENDENTE'
          }
        })
  
        const adminUsers = await prisma.user.findMany({
          where: {
            group: 'ADMINISTRADOR'
          }
        })
  
        const emails = adminUsers.map(user => user.email);
  
        const emailString = emails.join(',');
        try {
        const transporter = nodemailer.createTransport({
          host: 'smtp-mail.outlook.com',
          port: 587,
          auth: {
            user: 'tcc.penatrilha@hotmail.com',
            pass: 'senhaforte@123'
          },
          tls: {
            rejectUnauthorized: false
          }
        })
  
        const variable = {
          managerName: user.name,
          currentYear: String(new Date().getFullYear())
        }
  
        const templatePath = resolve(__dirname, '..', '..', '..', 'views', 'welcome', 'index.hbs')
  
        const tamplateFileContent = fs.readFileSync(templatePath).toString('utf-8');
  
        const templateParse = handlebars.compile(tamplateFileContent);
  
        const templateHTML = templateParse(variable)
  
        const message = await transporter.sendMail({
          to: user.email,
          from: 'tcc.penatrilha@hotmail.com',
          subject: 'Pé na Trilha - Validação de gerente',
          html: templateHTML,
          cc: 'gusthavorangel@gmail.com,jprgui@gmail.com'
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


