const Card = require('../models/card');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (err) {
    res.status(500).send({ message: 'Oшибка по-умолчанию', ...err });
  }
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
  const UserId = req.params.cardId;
  try {
    const cards = await Card.findByIdAndRemove(UserId, {
      new: true,
      runValidators: true,
    });
    res.status(200).send(cards);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    res.status(500).send({ message: 'Oшибка по-умолчанию', ...err });
  }
  return true;
};
