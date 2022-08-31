const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const cardRoutes = require('./routes/card');

const { PORT = 3000 } = process.env;
const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use((req, res, next) => {
  req.user = {
    _id: '630b6d27e21173e3b622bb1c',
  };

  next();
});

app.use(userRoutes);
app.use(cardRoutes);

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });
    await app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
