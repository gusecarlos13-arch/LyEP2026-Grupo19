import axios from "axios";

// Antes: "https://fakestoreapi.com/users" (API pública de prueba).
// Ahora: backend propio. La dirección se toma de client/.env (VITE_API_URL).
const API = import.meta.env.VITE_API_URL ?? "http://localhost:3001";
const URL = `${API}/api/clientes`;

const obtenerClientes = async () => {

    const respuesta = await axios.get(URL);

    return respuesta.data;
};

const obtenerCliente = async (id) => {

    const respuesta = await axios.get(`${URL}/${id}`);

    return respuesta.data;
};

const crearCliente = async (cliente) => {

    const respuesta = await axios.post(
        URL,
        cliente
    );

    return respuesta.data;
};

const eliminarCliente = async (id) => {

    const respuesta = await axios.delete(`${URL}/${id}`);

    return respuesta.data;
};

export default {
    obtenerClientes,
    obtenerCliente,
    crearCliente,
    eliminarCliente
};
