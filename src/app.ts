import fastify from 'fastify'
import userRoutes from './routes/user.routes'
import authenticateRoutes from './routes/authenticate.routes'

const app = fastify({ logger: true })

app.register(authenticateRoutes, { prefix: 'auth' })
app.register(userRoutes, { prefix: 'user' })

app.addHook('onRequest', (request, reply, done) => {
  reply.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  reply.header('Access-Control-Allow-Headers', '*')
  reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  done()
})

export { app }
