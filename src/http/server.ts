import fastifyCors from '@fastify/cors'
import fastify from 'fastify'
import {
  ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { errorHandler } from './error-handler'
import { createUser } from './routes/user.routes'

const app = fastify({ logger: true })

app.register(fastifyCors).withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Pé na Trilha',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
})

app.register(createUser)

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running 🔥')
})
