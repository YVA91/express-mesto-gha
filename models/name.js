const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    default: "Жак-Ив Кусто"
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    default: "Исследователь"
  },
  avatar: {
    type: String,
    required: true,
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png"
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return isEmail(v);
      },
      message: 'Указан неверный формат почты'
    },
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
