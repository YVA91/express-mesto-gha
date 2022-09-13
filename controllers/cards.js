const Card = require('../models/card');
const { BadRequestError } = require('../errors/BadRequestError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (err) {
    next(err);
  }
  return true;
};

module.exports.createCards = async (req, res, next) => {
  const {
    name, link, likes, createdAt,
  } = req.body;
  const owner = req.user._id;
  try {
    const cards = await Card({
      name, link, likes, createdAt, owner,
    }).save();
    res.status(200).send(cards);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные'));
    }
    next(err);
  }
  return true;
};

module.exports.deleteCards = async (req, res, next) => {
  const CardId = req.params.cardId;
  try {
    const UserId = await Card.findById(req.params.cardId);
    if (req.user._id === UserId.owner._id.valueOf()) {
      const cards = await Card.findByIdAndRemove(CardId, {
        new: true,
        runValidators: true,
      });
      if (!cards) {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
      res.status(200).send(cards);
    } else {
      throw new ForbiddenError('Недостаточно прав');
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    }
    next(err);
  }
  return true;
};

module.exports.likeCard = async (req, res, next) => {
  const CardId = req.params.cardId;
  try {
    const cards = await Card.findByIdAndUpdate(CardId, { $addToSet: { likes: req.user._id } }, {
      new: true,
    });
    if (!cards) {
      throw new NotFoundError('Передан несуществующий _id карточки');
    }
    res.status(200).send(cards);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    }
    next(err);
  }
  return true;
};

module.exports.dislikeCard = async (req, res, next) => {
  const CardId = req.params.cardId;
  try {
    const cards = await Card.findByIdAndUpdate(CardId, { $pull: { likes: req.user._id } }, {
      new: true,
    });
    if (!cards) {
      throw new NotFoundError('Передан несуществующий _id карточки');
    }
    res.status(200).send(cards);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    }
    next(err);
  }
  return true;
};
