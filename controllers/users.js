const User = require('../models/name');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.getUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    res.status(500).send({ message: 'Oшибка по-умолчанию', ...err });
  }
  return true;
};

module.exports.getUserById = async (req, res) => {
  const id = req.params.userId;
  try {
    const users = await User.findById(id);
    if (!users) {
      return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
    }
    res.status(200).send(users);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    res.status(500).send({ message: 'Oшибка по-умолчанию', ...err });
  }
  return true;
};

module.exports.createUsers = async (req, res) => {
  const {
    name, about, avatar, email, password
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    const users = await User({ name, about, avatar, email, password: hashedPassword}).save();
    res.status(200).send(users);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    res.status(500).send({ message: 'Oшибка по-умолчанию', ...err });
  }
};

module.exports.updateUserInfo = async (req, res) => {
  try {
    const UserId = req.user._id;
    const users = await User.findByIdAndUpdate(UserId, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).send(users);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    res.status(500).send({ message: 'Oшибка по-умолчанию', ...err });
  }
  return true;
};

module.exports.updateUserAratar = async (req, res) => {
  const UserId = req.user._id;
  try {
    const users = await User.findByIdAndUpdate(UserId, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).send(users);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    if (err.name === 'CastError') {
      return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
    }
    res.status(500).send({ message: 'Oшибка по-умолчанию', ...err });
  }
  return true;
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await User.findOne({email});
    if (!users) {
      return res.status(401).send({ message: 'Неправильные почта или пароль' });
    }
    const match = await bcrypt.compare(password, users.password);
    if(!match) {
      return res.status(401).send({ message: 'Неправильные почта или пароль' });
    }
    const token =  jwt.sign({ _id: users._id }, 'some-secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true, sameSite: true,}).status(200).send({ token });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    res.status(500).send({ message: 'Oшибка по-умолчанию', ...err });
  }
  return true;
};

