import mongoose from 'mongoose'
import Cliente from '../models/Cliente.js'

const noEncontrado = (res) =>
  res.status(404).json({ error: 'Cliente no encontrado' })

// GET /api/clientes
export const listarClientes = async (_req, res, next) => {
  try {
    const clientes = await Cliente.find().sort({ createdAt: 1 })
    res.json(clientes)
  } catch (error) {
    next(error)
  }
}

// GET /api/clientes/:id
export const obtenerCliente = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) return noEncontrado(res)

    const cliente = await Cliente.findById(id)
    if (!cliente) return noEncontrado(res)

    res.json(cliente)
  } catch (error) {
    next(error)
  }
}

// POST /api/clientes
export const crearCliente = async (req, res, next) => {
  try {
    const cliente = await Cliente.create(req.body)
    res.status(201).json(cliente)
  } catch (error) {
    next(error)
  }
}

// PUT /api/clientes/:id
export const actualizarCliente = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) return noEncontrado(res)

    const cliente = await Cliente.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    })
    if (!cliente) return noEncontrado(res)

    res.json(cliente)
  } catch (error) {
    next(error)
  }
}

// DELETE /api/clientes/:id
export const eliminarCliente = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) return noEncontrado(res)

    const cliente = await Cliente.findByIdAndDelete(id)
    if (!cliente) return noEncontrado(res)

    res.json(cliente)
  } catch (error) {
    next(error)
  }
}
