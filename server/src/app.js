import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import clientesRoutes from './routes/clientes.routes.js'

const app = express()

const origenesPermitidos = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origen) => origen.trim())

app.use(cors({ origin: origenesPermitidos }))
app.use(express.json())

// Servidor base: confirma que la API responde
app.get('/', (_req, res) => {
  res.json({ mensaje: 'API del Panel de Control de Clientes funcionando' })
})

// Estado del servidor y de la conexión con la base de datos
app.get('/api/health', (_req, res) => {
  res.json({
    servidor: 'ok',
    baseDeDatos: mongoose.connection.readyState === 1 ? 'conectada' : 'desconectada'
  })
})

app.use('/api/clientes', clientesRoutes)

// Ruta inexistente
app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

// Manejo centralizado de errores
app.use((error, _req, res, _next) => {
  if (error.name === 'ValidationError') {
    const detalles = Object.values(error.errors).map((e) => e.message)
    return res.status(400).json({ error: 'Datos inválidos', detalles })
  }

  console.error(error)
  res.status(500).json({ error: 'Error interno del servidor' })
})

export default app
