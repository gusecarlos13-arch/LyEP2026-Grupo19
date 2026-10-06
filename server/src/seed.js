import 'dotenv/config'
import { conectarDB, desconectarDB } from './config/db.js'
import Cliente from './models/Cliente.js'

// Datos iniciales con la misma forma que usaba FakeStoreAPI.
// Ejecutar con: npm run seed  (borra los clientes existentes y carga estos)
const clientesIniciales = [
  { email: 'almacen.dongaspar@gmail.com', username: 'dongaspar', password: 'Cliente123', name: { firstname: 'Gaspar', lastname: 'Quispe' }, address: { city: 'San Salvador de Jujuy', street: 'Belgrano', number: 1250, zipcode: '4600' }, phone: '388-4123456' },
  { email: 'kiosco.lasflores@gmail.com', username: 'lasflores', password: 'Cliente123', name: { firstname: 'Rosa', lastname: 'Mamani' }, address: { city: 'Palpalá', street: 'Río de la Plata', number: 340, zipcode: '4612' }, phone: '388-4234567' },
  { email: 'autoservicio.norte@gmail.com', username: 'autonorte', password: 'Cliente123', name: { firstname: 'Javier', lastname: 'Cruz' }, address: { city: 'Salta', street: 'Av. Sarmiento', number: 845, zipcode: '4400' }, phone: '387-4345678' },
  { email: 'despensa.mirta@gmail.com', username: 'despensamirta', password: 'Cliente123', name: { firstname: 'Mirta', lastname: 'Choque' }, address: { city: 'La Quiaca', street: 'Av. España', number: 210, zipcode: '4650' }, phone: '3885-421234' },
  { email: 'minimercado.elsol@gmail.com', username: 'elsol', password: 'Cliente123', name: { firstname: 'Ramón', lastname: 'Tolaba' }, address: { city: 'San Pedro de Jujuy', street: 'Rivadavia', number: 98, zipcode: '4500' }, phone: '3888-420987' },
  { email: 'almacen.lapuna@gmail.com', username: 'lapuna', password: 'Cliente123', name: { firstname: 'Elena', lastname: 'Vilte' }, address: { city: 'Humahuaca', street: 'Tucumán', number: 55, zipcode: '4630' }, phone: '3887-421456' },
  { email: 'distribuidora.oran@gmail.com', username: 'oranmayorista', password: 'Cliente123', name: { firstname: 'Luis', lastname: 'Guerrero' }, address: { city: 'San Ramón de la Nueva Orán', street: 'Pellegrini', number: 432, zipcode: '4530' }, phone: '3878-421789' },
  { email: 'kiosco.centro@gmail.com', username: 'kioscocentro', password: 'Cliente123', name: { firstname: 'Patricia', lastname: 'Flores' }, address: { city: 'Salta', street: 'Caseros', number: 670, zipcode: '4400' }, phone: '387-4456789' },
  { email: 'almacen.tilcara@gmail.com', username: 'tilcara', password: 'Cliente123', name: { firstname: 'Hugo', lastname: 'Cari' }, address: { city: 'Tilcara', street: 'Belgrano', number: 120, zipcode: '4624' }, phone: '388-4567890' },
  { email: 'superchino.perico@gmail.com', username: 'superperico', password: 'Cliente123', name: { firstname: 'Wei', lastname: 'Chen' }, address: { city: 'Perico', street: 'San Martín', number: 905, zipcode: '4608' }, phone: '388-4678901' }
]

const cargarDatos = async () => {
  try {
    await conectarDB(process.env.MONGODB_URI)
    await Cliente.deleteMany({})
    const creados = await Cliente.insertMany(clientesIniciales)
    console.log(`Se cargaron ${creados.length} clientes de prueba`)
  } catch (error) {
    console.error('Error al cargar los datos:', error.message)
    process.exitCode = 1
  } finally {
    await desconectarDB()
  }
}

cargarDatos()
