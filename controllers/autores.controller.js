const autorModel = require('../models/autorModel');
const postModel = require('../models/postModel');

const getAutores = async (req, res) => {
  try {
    const autores = await autorModel.obtenerTodos();
    res.json(autores);
  } catch (error) {
    console.error('Error al listar autores:', error.message);
    res.status(500).json({ mensaje: 'Error al obtener los autores' });
  }
};

const createAutor = async (req, res) => {
  try {
    const { nombre, email, imagen } = req.body;

    if (!nombre || !email) {
      return res.status(400).json({ mensaje: 'El nombre y el email son obligatorios' });
    }

    const nuevoId = await autorModel.crear(nombre, email, imagen);

    res.status(201).json({
      mensaje: 'Autor creado correctamente',
      autor: { id: nuevoId, nombre, email, imagen: imagen || null },
    });
  } catch (error) {
    console.error('Error al crear autor:', error.message);
    res.status(500).json({ mensaje: 'Error al guardar el autor' });
  }
};

const getPostsPorAutor = async (req, res) => {
  try {
    const { autorId } = req.params;
    const posts = await postModel.obtenerPorAutor(autorId);
    res.json(posts);
  } catch (error) {
    console.error('Error al listar posts del autor:', error.message);
    res.status(500).json({ mensaje: 'Error al obtener los posts del autor' });
  }
};

module.exports = {
  getAutores,
  createAutor,
  getPostsPorAutor,
};
