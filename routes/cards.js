const router = require('express').Router();

const {
  getCards,
  createCards,
  deleteCards,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { 
  validationСardId,
  validationCreateCards,
 } = require('../validation/validation');

router.get('/cards', getCards);
router.post('/cards', validationCreateCards, createCards);
router.delete('/cards/:cardId', validationСardId, deleteCards);
router.put('/cards/:cardId/likes', validationСardId, likeCard);
router.delete('/cards/:cardId/likes', validationСardId, dislikeCard);

module.exports = router;
