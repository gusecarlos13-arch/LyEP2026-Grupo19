import mongoose from 'mongoose'

// El esquema respeta la misma forma de datos que devolvía FakeStoreAPI (/users),
// así el frontend sigue funcionando sin cambiar sus componentes.
const clienteSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email inválido']
    },
    username: { type: String, trim: true },
    password: { type: String },
    name: {
      firstname: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
      },
      lastname: { type: String, trim: true, default: '-' }
    },
    address: {
      city: { type: String, trim: true },
      street: { type: String, trim: true },
      number: { type: Number },
      zipcode: { type: String, trim: true }
    },
    phone: { type: String, trim: true }
  },
  {
    timestamps: true,
    toJSON: {
      // MongoDB guarda el identificador como _id; el frontend usa "id".
      transform: (_doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        return ret
      }
    }
  }
)

const Cliente = mongoose.model('Cliente', clienteSchema)

export default Cliente
