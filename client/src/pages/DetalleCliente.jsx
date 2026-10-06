import '../css/detallecliente.css'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clientesService from "../services/clientesService";
import useClientes from "../hooks/useClientes";

const DetalleCliente = () => {
 const { id } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const { quitarCliente } = useClientes();

  const [cliente, setCliente] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [noEncontrado, setNoEncontrado] = useState(false);

  useEffect(() => {
    clientesService
      .obtenerCliente(id)
      .then((data) => setCliente(data))
      .catch(() => setNoEncontrado(true));
  }, [id]);

  const eliminarCliente = async () => {
    try {
      await clientesService.eliminarCliente(id);

      quitarCliente(id);
      setMensaje("Cliente eliminado correctamente");

      setTimeout(() => {
        navigate("/clientes");
      }, 2000);
    } catch {
      setMensaje("Error al eliminar cliente");
    }
  };
  if (noEncontrado) {
    return <h2>Cliente no encontrado.</h2>;
  }

  if (!cliente) {
    return <h2>Cargando cliente...</h2>;
  }

  return (
    <div className="detalle-cliente">
      <h1>Ficha del Cliente</h1>
      <p>Rol actual: {role}</p>

      {mensaje && <p className = 'mensaje-eliminado'>{mensaje}</p>}

      <p>
        <strong>ID:</strong> {cliente.id}
      </p>

      <p>
        <strong>Nombre:</strong>{" "}
        {cliente.name.firstname} {cliente.name.lastname}
      </p>

      <p>
        <strong>Email:</strong> {cliente.email}
      </p>

      <p>
        <strong>Teléfono:</strong> {cliente.phone}
      </p>

      <h2>Dirección</h2>

      <p>
        <strong>Calle:</strong> {cliente.address.street}
      </p>

      <p>
        <strong>Número:</strong> {cliente.address.number}
      </p>

      <p>
        <strong>Código Postal:</strong> {cliente.address.zipcode}
      </p>

      <p>
        <strong>Ciudad:</strong> {cliente.address.city}
      </p>

      <h2>Credenciales</h2>

      <p>
        <strong>Usuario:</strong> {cliente.username}
      </p>

      <p>
        <strong>Contraseña:</strong> {cliente.password}
      </p>

      {role?.trim() === "Gerencia" && (
        <button className='btn-eliminar'onClick={eliminarCliente}>
          Eliminar Cliente
        </button>
      )}
    </div>
  );
};

export default DetalleCliente;