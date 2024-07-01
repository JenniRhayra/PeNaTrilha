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
import { listPark } from './routes/park/list-park'
import { listSpeciality } from './routes/guide/list-specialitys'
import fastifyCookie from '@fastify/cookie';
import { createManagerAccount } from './routes/manager/create-manager-account'
import { listManyParkInfo } from './routes/park/list-many-parks-info'
import { listManyParkInfoById } from './routes/park/list-many-parks-info-by-id'
import { findParkVisit } from './routes/user/find-park-visit'
import { getGuide } from './routes/guide/get-guide'
import { listActivityById } from './routes/park/list-activity-by-id'
import { updateParkVisit } from './routes/user/update-park-visit'
import { listEventById } from './routes/park/list-event-by-id'
import { getGuideProfile } from './routes/guide/get-guide-profile'
import { listParkVisit } from './routes/user/list-park-visit'
import { getManagerProfile } from './routes/manager/get-manager-profile'
import { getUserProfile } from './routes/user/get-user-profile'
import { inativeUser } from './routes/user/inative-user'
import { listManyActivityById } from './routes/park/list-many-activity-by-id'
import { deleteActivity } from './routes/park/delete-activity'
import { updateActivity } from './routes/park/update-activity'
import { createActivity } from './routes/park/create-activity'
import { listManyEventById } from './routes/park/list-many-events-by-id'
import { listManyGoodPracticeById } from './routes/park/list-many-good-practice-by-id'
import { listGuideByPark } from './routes/guide/list-guide-by-park'
import { approveGuide } from './routes/manager/approve-guide'


const app = fastify({ logger: false, bodyLimit: 90485760, maxParamLength: 90000 }).withTypeProvider<ZodTypeProvider>()
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

app.register(fastifyCookie);

app.register(fastifyJwt, {
  secret: process.env.JWT,
})

app.register(fastifyCors)

// AUTH
app.register(authenticateWithPassword)
app.register(getProfile)

// USER
app.register(createUser)
app.register(getUserProfile)
app.register(findParkVisit)
app.register(inativeUser)
app.register(listParkVisit)
app.register(listUsers)
app.register(updateParkVisit)

//GUIDE
app.register(createGuideAccount)
app.register(getGuide)
app.register(getGuideProfile)
app.register(listGuideByPark)
app.register(listLanguages)
app.register(listSpeciality)

//MANAGER
app.register(approveGuide)
app.register(createManagerAccount)
app.register(getManagerProfile)

//PARK
app.register(createActivity)
app.register(createParkAccount)
app.register(deleteActivity)
app.register(listActivityById)
app.register(listEventById)
app.register(listForestType)
app.register(listManyActivityById)
app.register(listManyEventById)
app.register(listManyGoodPracticeById)
app.register(listManyParkInfo)
app.register(listManyParkInfoById)
app.register(listPark)
app.register(updateActivity)

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running in port 3333🔥')
})
