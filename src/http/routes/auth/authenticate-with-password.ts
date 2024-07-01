import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { BadRequestError } from '../_error/BadRequestError'
import { compare } from 'bcryptjs'

export async function authenticateWithPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/password',
    {
      schema: {
        tags: ['auth'],
        summary: 'Autenticação via email e senha',
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
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
        },
      },
    },
    async (request, reply) => {
      try {
        const { email, password } = request.body
        console.log(email, password)
        const userAlreadyExist = await prisma.user.findUnique({
          where: {
            email,
          },
        })
  
        if (!userAlreadyExist) {
          return reply.code(400).send({ message: 'Usuário ou senha incorreta.' })
        }

        if (!userAlreadyExist.isActive) {
          return reply.code(400).send({ message: 'Usuário não encontrado.' })
        }
  
        const passwordHash = await compare(password, userAlreadyExist.password)
  
        if (!passwordHash) {
          throw new BadRequestError('Usuário ou senha incorreta.')
        }
  
        const token = await reply.jwtSign(
          {
            sub: userAlreadyExist.id,
          },
          {
            expiresIn: '1d',
          },
        )

        return reply.code(201).send({ token, id: userAlreadyExist.id, email, group: userAlreadyExist.group })
      } catch (error) {
        console.log('error', error);
        return reply.code(400).send({ message: 'Ocorreu um erro ao listar os parques' });
      }
    },
  )
}
