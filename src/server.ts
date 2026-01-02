import 'dotenv/config'
import { app } from './app'
import { env } from './utils/env'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(async () => {
    await app.ready()
    console.log(app.printRoutes()) // <-- ADICIONE ISTO
    console.log(`🚀 HTTP server running on http://localhost:${env.PORT}`)
  })
