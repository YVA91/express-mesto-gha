const express = require('express');
const mongoose = require('mongoose');
const RoutesUsers = require('./routes/users');
const RoutesCards = require('./routes/cards');


const { PORT = 3000 } = process.env;
const app = express();



app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '630a33e4144bb53119200aa1',
  };
  next();
});

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
