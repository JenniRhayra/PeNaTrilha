import fastify from 'fastify'
import userRoutes from './routes/user.routes'
import authenticateRoutes from './routes/authenticate.routes'

const app = fastify({ logger: true })

app.register(authenticateRoutes, { prefix: 'auth' })
app.register(userRoutes, { prefix: 'user' })

export { app }
