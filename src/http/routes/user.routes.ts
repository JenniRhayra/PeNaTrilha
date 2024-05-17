import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { BadRequestError } from './_error/BadRequestError'
import { hash } from 'bcryptjs'

export async function createUser(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().post(
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
        },
      },
    },
    async (request, reply) => {
      const { email, password, group } = request.body

      const userAlreadyExist = await prisma.user.findFirst({
        where: {
          email,
        },
      })

      if (userAlreadyExist) {
        throw new BadRequestError('Usuário já cadastrado')
      }

      const passwordHash = await hash(password, 8)

      try {
        await prisma.user.create({
          data: {
            email,
            password: passwordHash,
            group_id: 1,
          },
        })
      } catch (error) {
        console.log(error)
      }

      return reply.code(201).send()
    },
  )
}
