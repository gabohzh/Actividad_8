require('dotenv').config();
const express = require('express');
const pool = require('./config/db');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);

async function iniciarServidor() {
  try {
    const conexion = await pool.getConnection();
    console.log('Conexión a MySQL exitosa');
    conexion.release();

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar con MySQL:', error.message);
    process.exit(1);
  }
}

iniciarServidor();
