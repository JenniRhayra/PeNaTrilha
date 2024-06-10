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
import { fastifyJwt } from '@fastify/jwt'
import { errorHandler } from './error-handler'
import { authenticateWithPassword } from './routes/auth/authenticate-with-password'
import { createUser } from './routes/user/create-user'
import { listUsers } from './routes/user/list-users'
import { getProfile } from './routes/auth/get-profile'
import { listLanguages } from './routes/guide/list-languages'
import { listForestType } from './routes/park/list-forest-type'
import { createGuideAccount } from './routes/guide/create-guide-account'
import { createParkAccount } from './routes/park/create-park-account'
// import fastifyMultipart from '@fastify/multipart'

const app = fastify({ logger: false }).withTypeProvider<ZodTypeProvider>()
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

// AUTH
app.register(authenticateWithPassword)
app.register(getProfile)

// USER
app.register(createUser)
app.register(listUsers)

//GUIDE
app.register(createGuideAccount)
app.register(listLanguages)

//PARK
app.register(createParkAccount)
app.register(listForestType)

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: process.env.JWT,
})

app.register(fastifyCors)

// app.register(fastifyMultipart);

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running in port 3333🔥')
})
