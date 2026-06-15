const pool = require('../config/db');

async function obtenerTodos() {
  const [filas] = await pool.query('SELECT * FROM autores');
  return filas;
}

async function crear(nombre, email, imagen) {
  const [resultado] = await pool.query(
    'INSERT INTO autores (nombre, email, imagen) VALUES (?, ?, ?)',
    [nombre, email, imagen || null]
  );
  return resultado.insertId;
}

module.exports = {
  obtenerTodos,
  crear,
};
