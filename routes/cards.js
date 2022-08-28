const router = require('express').Router();
const {
  getCards,
  createCards,
  deleteCards,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCards);
router.delete('/cards/:cardId', deleteCards);

module.exports = router;
