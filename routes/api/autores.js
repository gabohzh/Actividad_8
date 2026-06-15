const router = require('express').Router();
const {
  getAutores,
  createAutor,
} = require('../../controllers/autores.controller');

router.get('/', getAutores);
router.post('/', createAutor);

module.exports = router;
