import express from 'express'
import cors from 'cors'

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

// Ruta inexistente
app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

// Manejo centralizado de errores
app.use((error, _req, res, _next) => {
  console.error(error)
  res.status(500).json({ error: 'Error interno del servidor' })
})

export default app
