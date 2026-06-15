const postModel = require('../models/postModel');

const getPosts = async (req, res) => {
  try {
    const posts = await postModel.obtenerTodos();
    res.json(posts);
  } catch (error) {
    console.error('Error al listar posts:', error.message);
    res.status(500).json({ mensaje: 'Error al obtener los posts' });
  }
};

const createPost = async (req, res) => {
  try {
    const { titulo, descripcion, categoria, autor_id } = req.body;

    if (!titulo || !autor_id) {
      return res.status(400).json({ mensaje: 'El titulo y el autor_id son obligatorios' });
    }

    const nuevoId = await postModel.crear(titulo, descripcion, categoria, autor_id);

    res.status(201).json({
      mensaje: 'Post creado correctamente',
      post: {
        id: nuevoId,
        titulo,
        descripcion: descripcion || null,
        categoria: categoria || null,
        autor_id,
      },
    });
  } catch (error) {
    console.error('Error al crear post:', error.message);

    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ mensaje: 'El autor_id no existe' });
    }

    res.status(500).json({ mensaje: 'Error al guardar el post' });
  }
};

module.exports = {
  getPosts,
  createPost,
};
