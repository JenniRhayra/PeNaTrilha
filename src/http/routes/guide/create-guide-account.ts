import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { hash } from 'bcryptjs'
import { prisma } from '../../../lib/prisma'
import { Groups } from '@prisma/client'

export async function createGuideAccount(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/guide/create-guide-account',
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
      const { email, password, group } = request.body

      const prismaGroup = mapGroupsZodToPrisma(group);

      const userAlreadyExist = await prisma.user.findFirst({
        where: {
          email,
        },
      })

      if (userAlreadyExist) {
        return reply
        .code(400)
        .send({ message: 'Usuário já cadastrado' })
      }

      const passwordHash = await hash(password, 8)
      console.log(email, password, group)
      try {
        await prisma.user.create({
          data: {
            email,
            password: passwordHash,
            group: prismaGroup as Groups,
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
function mapGroupsZodToPrisma(group: any) {
  throw new Error('Function not implemented.')
}

