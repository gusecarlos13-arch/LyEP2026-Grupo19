import { useContext } from 'react'
import { ClientesContext } from '../context/clientes.context'

const useClientes = () => {
  return useContext(ClientesContext)
}

export default useClientes