import { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'
import { BadRequestError } from './routes/_error/BadRequestError'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.code(400).send({
      message: 'Validation error',
      error: error.flatten().fieldErrors,
    })
  }

  if (error instanceof BadRequestError) {
    return reply.code(400).send({
      message: error.message,
    })
  }

  return reply.code(500).send({ message: 'Internal server error.' })
}
