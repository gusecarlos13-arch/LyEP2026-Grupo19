// Pruebas de la API de clientes.
// Simulan la base de datos (no necesitan conexión a Atlas): verifican rutas,
// códigos de respuesta y que los datos mantengan la forma que espera el frontend.
// Ejecutar con: npm test
import { test, describe, afterEach, mock } from 'node:test'
import assert from 'node:assert/strict'
import request from 'supertest'
import mongoose from 'mongoose'
import app from '../src/app.js'
import Cliente from '../src/models/Cliente.js'

const clienteDePrueba = () =>
  new Cliente({
    email: 'almacen.dongaspar@gmail.com',
    username: 'dongaspar',
    password: 'Cliente123',
    name: { firstname: 'Gaspar', lastname: 'Quispe' },
    address: { city: 'San Salvador de Jujuy', street: 'Belgrano', number: 1250, zipcode: '4600' },
    phone: '388-4123456'
  })

afterEach(() => mock.restoreAll())

describe('Servidor base', () => {
  test('GET / responde que la API funciona', async () => {
    const res = await request(app).get('/')
    assert.equal(res.status, 200)
    assert.match(res.body.mensaje, /funcionando/)
  })

  test('una ruta inexistente devuelve 404', async () => {
    const res = await request(app).get('/api/no-existe')
    assert.equal(res.status, 404)
  })
})

describe('GET /api/clientes', () => {
  test('devuelve la lista con la forma que usa el frontend', async () => {
    const doc = clienteDePrueba()
    mock.method(Cliente, 'find', () => ({ sort: async () => [doc] }))

    const res = await request(app).get('/api/clientes')

    assert.equal(res.status, 200)
    assert.equal(res.body.length, 1)
    const [cliente] = res.body
    assert.equal(cliente.id, doc._id.toString())
    assert.equal(cliente._id, undefined)
    assert.equal(cliente.name.firstname, 'Gaspar')
    assert.equal(cliente.name.lastname, 'Quispe')
    assert.equal(cliente.address.city, 'San Salvador de Jujuy')
    assert.equal(cliente.phone, '388-4123456')
  })
})

describe('GET /api/clientes/:id', () => {
  test('devuelve un cliente existente', async () => {
    const doc = clienteDePrueba()
    mock.method(Cliente, 'findById', async () => doc)

    const res = await request(app).get(`/api/clientes/${doc._id}`)

    assert.equal(res.status, 200)
    assert.equal(res.body.email, 'almacen.dongaspar@gmail.com')
  })

  test('devuelve 404 si el cliente no existe', async () => {
    mock.method(Cliente, 'findById', async () => null)
    const id = new mongoose.Types.ObjectId()

    const res = await request(app).get(`/api/clientes/${id}`)

    assert.equal(res.status, 404)
  })

  test('devuelve 404 si el id no es válido', async () => {
    const res = await request(app).get('/api/clientes/abc')
    assert.equal(res.status, 404)
  })
})

describe('POST /api/clientes', () => {
  test('crea un cliente con los datos del formulario', async () => {
    mock.method(Cliente, 'create', async (datos) => new Cliente(datos))
    const nuevo = {
      email: 'kiosco@gmail.com',
      username: 'kiosco',
      password: '1234',
      name: { firstname: 'Kiosco', lastname: '-' },
      address: { city: 'Salta' },
      phone: '387-4000000'
    }

    const res = await request(app).post('/api/clientes').send(nuevo)

    assert.equal(res.status, 201)
    assert.ok(res.body.id, 'la respuesta debe traer el id que muestra el formulario')
    assert.equal(res.body.address.city, 'Salta')
  })

  test('rechaza un cliente sin email ni nombre', async () => {
    const res = await request(app).post('/api/clientes').send({ phone: '123' })

    assert.equal(res.status, 400)
    assert.equal(res.body.error, 'Datos inválidos')
  })
})

describe('PUT /api/clientes/:id', () => {
  test('actualiza un cliente existente', async () => {
    const doc = clienteDePrueba()
    doc.phone = '388-4999999'
    mock.method(Cliente, 'findByIdAndUpdate', async () => doc)

    const res = await request(app)
      .put(`/api/clientes/${doc._id}`)
      .send({ phone: '388-4999999' })

    assert.equal(res.status, 200)
    assert.equal(res.body.phone, '388-4999999')
  })
})

describe('DELETE /api/clientes/:id', () => {
  test('elimina un cliente existente', async () => {
    const doc = clienteDePrueba()
    mock.method(Cliente, 'findByIdAndDelete', async () => doc)

    const res = await request(app).delete(`/api/clientes/${doc._id}`)

    assert.equal(res.status, 200)
    assert.equal(res.body.id, doc._id.toString())
  })

  test('devuelve 404 si el cliente no existe', async () => {
    mock.method(Cliente, 'findByIdAndDelete', async () => null)
    const id = new mongoose.Types.ObjectId()

    const res = await request(app).delete(`/api/clientes/${id}`)

    assert.equal(res.status, 404)
  })
})
