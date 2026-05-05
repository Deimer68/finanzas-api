const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/categorias', require('./routes/categoriaRoutes'));
app.use('/api/transacciones', require('./routes/transaccionRoutes'));
app.use('/api/presupuestos', require('./routes/presupuestoRoutes'));
app.use('/api/onboarding', require('./routes/onboardingRoutes'));
app.use('/api/deudas', require('./routes/deudaRoutes'));
app.use('/api/inversiones', require('./routes/inversionRoutes'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => res.json({ mensaje: 'API Finanzas funcionando' }));

module.exports = app;