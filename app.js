const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');
const RoutesUsers = require('./routes/users');
const RoutesCards = require('./routes/cards');
const {
  login,
  createUsers,
} = require('./controllers/users');
require('dotenv').config();

const { 
  validationSignUp,
  validationSignIn,
 } = require('./validation/validation')

const { PORT = 3000 } = process.env;
const app = express();
app.use(cookieParser());

app.use(express.json());
app.post('/signin', validationSignIn, login);
app.post('/signup', validationSignUp, createUsers);
app.use(auth);

app.use('/', RoutesUsers);
app.use('/', RoutesCards);
app.use((req, res) => {
  res.status(404).send({ message: 'Неправильный путь' });
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  await app.listen(PORT);
  console.log(`Сервер запущен на ${PORT} порту`);
}

main();
