# API Finanzas Personales

API REST para gestión de finanzas personales desarrollada con Node.js, Express y MongoDB.

## Tecnologías
- Node.js + Express
- MongoDB + Mongoose
- JWT para autenticación
- Swagger para documentación

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
   npm install
3. Crear archivo .env con las siguientes variables:
   MONGODB_URI=tu_cadena_de_conexion_mongodb
   PORT=3000
   JWT_SECRET=tu_clave_secreta

## Ejecución
   node index.js

## Documentación
Una vez corriendo, acceder a:
http://localhost:3000/api-docs

## Endpoints principales
- POST /api/usuarios/registrar
- POST /api/usuarios/login
- GET/POST/PUT/DELETE /api/categorias
- GET/POST/PUT/DELETE /api/transacciones
- GET/POST/PUT/DELETE /api/presupuestos