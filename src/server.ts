import { app } from './app'

app.listen({ port: 3333 }).then(() => {
  console.log('server listening on http://localhost:3333 🔥')
})
