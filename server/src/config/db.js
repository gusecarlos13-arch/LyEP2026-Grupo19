import dns from 'node:dns'
import mongoose from 'mongoose'

// En algunas redes (sobre todo en Windows) Node no logra consultar los
// registros SRV de Atlas y falla con "querySrv ECONNREFUSED".
// Para esa consulta usamos servidores DNS públicos (Google y Cloudflare).
dns.setServers(['8.8.8.8', '1.1.1.1'])

// Conecta con MongoDB Atlas usando la cadena de conexión del archivo .env
export const conectarDB = async (uri) => {
  if (!uri) {
    throw new Error('Falta la variable MONGODB_URI en server/.env')
  }

  await mongoose.connect(uri)
  console.log(`Conectado a MongoDB: base "${mongoose.connection.name}"`)
}

export const desconectarDB = () => mongoose.disconnect()