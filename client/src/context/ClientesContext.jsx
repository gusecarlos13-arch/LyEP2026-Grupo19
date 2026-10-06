import { useState, useEffect } from 'react'
import { ClientesContext } from './clientes.context'
import clientesService from '../services/clientesService'

const ClientesProvider = ({ children }) => {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const cargarClientes = async () => {
      try {
        const datos = await clientesService.obtenerClientes()
        setClientes(datos)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    cargarClientes()
  }, [])

  const agregarCliente = (clienteNuevo) => {
    setClientes((clientesActuales) => [...clientesActuales, clienteNuevo])
  }

  return (
    <ClientesContext.Provider value={{ clientes, loading, error, agregarCliente }}>
      {children}
    </ClientesContext.Provider>
  )
}

export default ClientesProvider