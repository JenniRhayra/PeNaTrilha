import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { hash } from 'bcryptjs'
import { prisma } from '../../../lib/prisma'
import { BadRequestError } from '../_error/BadRequestError'

export async function createUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/user/create-user',
    {
      schema: {
        tags: ['user'],
        summary: 'Criar uma nova conta',
        body: z.object({
          email: z.string().email(),
          password: z.string().min(6),
          group: z.enum(['1', '2', '3', '4']),
        }),
        response: {
          201: z.void(),
          400: z.object({
            message: z.string(),
            error: z.object({}),
          }),
          500: z.object({
            message: z.string(),
            error: z.object({}),
          }),
        },
      },
    },
    async (request, reply) => {
      console.log('OLA')
      const { email, password, group } = request.body
      console.log(email)
      const userAlreadyExist = await prisma.user.findFirst({
        where: {
          email,
        },
      })

      if (userAlreadyExist) {
        throw new BadRequestError('Usuário já cadastrado')
      }

      const passwordHash = await hash(password, 8)
      console.log(email, password, group)
      try {
        await prisma.user.create({
          data: {
            email,
            password: passwordHash,
            group,
          },
        })
      } catch (error) {
        console.log('erro', error)
        return reply
          .code(500)
          .send({ message: 'Ocorreu um erro ao criar o usuário', error })
      }

      return reply.code(201).send()
    },
  )
}
