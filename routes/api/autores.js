const router = require('express').Router();
const {
  getAutores,
  createAutor,
  getPostsPorAutor,
} = require('../../controllers/autores.controller');

router.get('/', getAutores);
router.get('/:autorId/posts', getPostsPorAutor);
router.post('/', createAutor);

module.exports = router;
