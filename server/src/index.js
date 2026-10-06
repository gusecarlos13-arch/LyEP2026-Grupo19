import 'dotenv/config'
import app from './app.js'
import { conectarDB } from './config/db.js'

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})

conectarDB(process.env.MONGODB_URI).catch((error) => {
  console.error('No se pudo conectar a MongoDB:', error.message)
})
