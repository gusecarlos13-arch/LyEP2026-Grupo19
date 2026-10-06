# LyEP2026 - Grupo 19: Panel de Control de Clientes

Trabajo Práctico N° 2 de Legislación y Ejercicio Profesional (APU - FI UNJu, 2026).

Panel de Control de Clientes hecho con React y Vite. En esta fase, la API pública de prueba (FakeStoreAPI) se reemplazó por un backend propio con Express y una base de datos real en MongoDB Atlas, sin romper el frontend.

## Arquitectura

```
LyEP2026-Grupo19/
├── client/   Frontend React + Vite          → http://localhost:5173
└── server/   API REST Express + Mongoose    → http://localhost:3001
                    │
                    └── MongoDB Atlas (base panel_clientes, colección clientes)
```

El frontend pide los datos al backend; el backend los lee y guarda en MongoDB Atlas y los devuelve con la misma forma que usaba FakeStoreAPI, por eso los componentes del frontend no cambiaron.

## Requisitos

- Node.js 20.19 o superior
- Una cadena de conexión de MongoDB Atlas

## Instalación y ejecución

### 1. Backend (`server/`)

```bash
cd server
npm install
# crear server/.env a partir de server/.env.example y completar MONGODB_URI
npm run seed      # (opcional) carga 10 clientes de prueba
npm run dev       # servidor en http://localhost:3001
```

### 2. Frontend (`client/`)

En otra terminal:

```bash
cd client
npm install
# crear client/.env a partir de client/.env.example (VITE_API_URL=http://localhost:3001)
npm run dev       # aplicación en http://localhost:5173
```

### 3. Pruebas del backend

```bash
cd server
npm test
```

Las pruebas simulan la base de datos, por lo que no necesitan conexión a Atlas.

## API REST

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/` | Verifica que el servidor responde |
| GET | `/api/health` | Estado del servidor y de la conexión con la base |
| GET | `/api/clientes` | Lista todos los clientes |
| GET | `/api/clientes/:id` | Devuelve un cliente |
| POST | `/api/clientes` | Crea un cliente |
| PUT | `/api/clientes/:id` | Actualiza un cliente |
| DELETE | `/api/clientes/:id` | Elimina un cliente |

Ejemplo de cliente:

```json
{
  "id": "6702f1c4e1a2b3c4d5e6f701",
  "email": "almacen.dongaspar@gmail.com",
  "username": "dongaspar",
  "name": { "firstname": "Gaspar", "lastname": "Quispe" },
  "address": { "city": "San Salvador de Jujuy", "street": "Belgrano", "number": 1250, "zipcode": "4600" },
  "phone": "388-4123456"
}
```

## Equipo y flujo de trabajo

| Integrante | Rama | Aporte |
| --- | --- | --- |
| Carlos, Gustavo Emanuel | `feature/carlos-gustavo` | Estructura del repositorio, servidor Express, conexión a MongoDB Atlas, modelo y datos de prueba |
| Mendivil, Lautaro Facundo | `feature/mendivil-lautaro` | API REST, integración con el frontend, pruebas y documentación |

- Cada integrante trabaja en su rama `feature/`; nadie hace push directo a `main` (está protegida por una regla del repositorio).
- Los cambios entran a `main` solo por Pull Request, revisado por el otro integrante.
- Commits semánticos: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`.

---

Código base del frontend: Cátedra Legislación y Ejercicio Profesional - Carrera Analista Programador Universitario - FI UNJu (licencia MIT).
