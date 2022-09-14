const router = require('express').Router();

const {
  getCards,
  createCards,
  deleteCards,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  validationCardId,
  validationCreateCards,
} = require('../validation/validation');

router.get('/cards', getCards);
router.post('/cards', validationCreateCards, createCards);
router.delete('/cards/:cardId', validationCardId, deleteCards);
router.put('/cards/:cardId/likes', validationCardId, likeCard);
router.delete('/cards/:cardId/likes', validationCardId, dislikeCard);

module.exports = router;
