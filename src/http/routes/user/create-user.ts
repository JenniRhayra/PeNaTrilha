import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { prisma } from '../../../lib/prisma'
import { Groups } from '@prisma/client'
import { addDays } from 'date-fns';
import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import { resolve } from 'path';
import handlebars from 'handlebars';

function mapGroupsZodToPrisma(value: string): Groups {
  switch (value) {
    case '1':
      return 'ADMINISTRADOR';
    case '2':
      return 'VISITANTE';
    case '3':
      return 'GERENTE';
    case '4':
      return 'GUIA';
    default:
      throw new Error(`Valor de grupo inválido: ${value}`);
  }
}

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  group: z.enum(['1', '2', '3', '4']),
});

type CreateUserBody = z.infer<typeof createUserSchema>;

const errorResponseSchema = z.object({
  message: z.string(),
  error: z.object({}).optional(),
});

export async function createUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/user/create-user',
    {
      schema: {
        tags: ['user'],
        summary: 'Criar uma nova conta',
        body: createUserSchema,
        response: {
          201: z.object({
            refreshToken: z.string(),
            email: z.string(),
            group: z.string(),
          }),
          400: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { email, password, group } = request.body as CreateUserBody;

      const prismaGroup = mapGroupsZodToPrisma(group);

      const userAlreadyExist = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (userAlreadyExist) {
        return reply
          .code(400)
          .send({ message: 'Usuário já cadastrado' });
      }

      const passwordHash = await hash(password, 8);
      const refreshToken = sign({ email }, process.env.JWT as string, { expiresIn: '7d' });

      try {
        const user = await prisma.user.create({
          data: {
            email,
            password: passwordHash,
            group: prismaGroup,
          },
        });

        const expiresIn = addDays(new Date(), 7);

        await prisma.refreshToken.create({
          data: {
            userId: user.id,
            token: refreshToken,
            expiresIn,
          }
        });
        
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

        if(group == '2'){ //e-maild de boas vindas somente para o visitante
          try {
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
        }
  


        reply.setCookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
        });

        return reply.code(201).send({ refreshToken, email, group });
      } catch (error) {
        console.error('Error creating user:', error);
        return reply
          .code(500)
          .send({
            message: 'Ocorreu um erro ao criar o usuário',
            error: error instanceof Error ? { message: error.message, stack: error.stack } : {},
          });
      }
    },
  );
}
