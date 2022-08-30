const Card = require('../models/card');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    res.status(500).send({ message: 'Oшибка по-умолчанию', ...err });
  }
  return true;
};

module.exports.createCards = async (req, res) => {
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
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    res.status(500).send({ message: 'Oшибка по-умолчанию', ...err });
  }
  return true;
};

module.exports.deleteCards = async (req, res) => {
  const CardId = req.params.cardId;
  try {
    const cards = await Card.findByIdAndRemove(CardId, {
      new: true,
      runValidators: true,
    });
    if (!cards) {
      return res.status(404).send({ message: 'Передан несуществующий _id карточки' });
    }
    res.status(200).send(cards);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    res.status(500).send({ message: 'Oшибка по-умолчанию', ...err });
  }
  return true;
};

module.exports.likeCard = async (req, res) => {
  const CardId = req.params.cardId;
  try {
    const cards = await Card.findByIdAndUpdate(CardId, { $addToSet: { likes: req.user._id } }, {
      new: true,
    });
    if (!cards) {
      return res.status(404).send({ message: 'Передан несуществующий _id карточки' });
    }
    res.status(200).send(cards);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    res.status(500).send({ message: 'Oшибка по-умолчанию', ...err });
  }
  return true;
};

module.exports.dislikeCard = async (req, res) => {
  const CardId = req.params.cardId;
  try {
    const cards = await Card.findByIdAndUpdate(CardId, { $pull: { likes: req.user._id } }, {
      new: true,
    });
    if (!cards) {
      return res.status(404).send({ message: 'Передан несуществующий _id карточки' });
    }
    res.status(200).send(cards);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    res.status(500).send({ message: 'Oшибка по-умолчанию', ...err });
  }
  return true;
};
