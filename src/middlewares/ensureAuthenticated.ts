import { FastifyReply, FastifyRequest } from 'fastify'
import { verify } from 'jsonwebtoken'

export function ensureAuthenticated(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return reply.status(401).send({ message: 'Token não fornecido' })
  }

  const [, token] = authToken.split(' ')

  try {
    verify(token, process.env.JWT)
    return reply.status(201).send()
  } catch (err) {
    return reply.status(403).send({ error: 'Token inválido' })
  }
}
