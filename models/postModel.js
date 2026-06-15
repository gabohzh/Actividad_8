const pool = require('../config/db');

async function obtenerTodos() {
  const [filas] = await pool.query(`
    SELECT
      p.id,
      p.titulo,
      p.descripcion,
      p.fecha_creacion,
      p.categoria,
      p.autor_id,
      a.nombre AS autor_nombre,
      a.email AS autor_email,
      a.imagen AS autor_imagen
    FROM posts p
    INNER JOIN autores a ON p.autor_id = a.id
    ORDER BY p.fecha_creacion DESC
  `);

  return filas.map((fila) => ({
    id: fila.id,
    titulo: fila.titulo,
    descripcion: fila.descripcion,
    fecha_creacion: fila.fecha_creacion,
    categoria: fila.categoria,
    autor_id: fila.autor_id,
    autor: {
      nombre: fila.autor_nombre,
      email: fila.autor_email,
      imagen: fila.autor_imagen,
    },
  }));
}

async function obtenerPorAutor(autorId) {
  const [filas] = await pool.query(
    `SELECT id, titulo, descripcion, fecha_creacion, categoria, autor_id
     FROM posts
     WHERE autor_id = ?
     ORDER BY fecha_creacion DESC`,
    [autorId]
  );
  return filas;
}

async function crear(titulo, descripcion, categoria, autorId) {
  const [resultado] = await pool.query(
    'INSERT INTO posts (titulo, descripcion, categoria, autor_id) VALUES (?, ?, ?, ?)',
    [titulo, descripcion || null, categoria || null, autorId]
  );
  return resultado.insertId;
}

module.exports = {
  obtenerTodos,
  obtenerPorAutor,
  crear,
};
